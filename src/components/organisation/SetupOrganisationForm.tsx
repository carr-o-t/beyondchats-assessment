"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { useEffect, useState } from "react";
import { fetchMetadata } from "@/lib/org"; // Assuming this fetches metadata
import { organisationSchema } from "@/lib/validations/org"; // Assuming this validates form input
import { Types } from "@/types"; // Assuming this defines form types

export default function SetupOrganisationForm() {
  const form = useForm<Types.organisationFormType>({
    resolver: zodResolver(organisationSchema),
    defaultValues: {
      companyName: "",
      websiteUrl: "",
      description: "",
    },
  });

  const [metadata, setMetadata] = useState<{ title?: string; description?: string }>({});
  const [scrapingData, setScrapingData] = useState<any[]>([]); // Track scraped data
  const [isTraining, setIsTraining] = useState(false); // To manage chatbot training state
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false); // To manage chatbot training state

  // Auto-fetch metadata when website URL changes
 // Debounced Metadata Fetching
 useEffect(() => {
  const websiteUrl = form.watch("websiteUrl");

  if (!websiteUrl) return;

  setIsLoadingMetadata(true);

  const debounceTimer = setTimeout(() => {
    fetchMetadata(websiteUrl)
      .then((data) => setMetadata(data))
      .finally(() => setIsLoadingMetadata(false));
  }, 500); // 500ms debounce

  return () => clearTimeout(debounceTimer); // Cleanup on re-renders
}, [form.watch("websiteUrl")]);

  const onSubmit = async (data: Types.organisationFormType) => {
    console.log("Organisation data:", data);
    // Simulate the scraping process with dummy data
    setScrapingData([
      { url: data.websiteUrl, status: "scraped", chunks: ["Chunk 1: Data", "Chunk 2: Content"] },
      { url: "https://example.com/page2", status: "pending", chunks: [] },
    ]);

    // Simulate starting chatbot training
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false); // Stop training after 5 seconds
    }, 5000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold">Setup Your Organisation</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              isLoadingMetadata && (
                <div className="text-muted-foreground italic text-sm">Loading metadata...</div>
              )
            }
            {metadata.title && (
              <div className="text-sm text-muted-foreground">
                <p>Title: {metadata.title}</p>
                <p>Description: {metadata.description}</p>
              </div>
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>

        {/* Scraping Status UI */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-bold">Scraping Status</h2>
          <div className="space-y-2">
            {scrapingData.map((page, index) => (
              <div key={index} className="p-4 border rounded">
                <p>URL: {page.url}</p>
                <p>Status: {page.status}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Scraped data for ${page.url}`)}
                >
                  View Data
                </Button>
                {page.status === "scraped" && (
                  <div className="mt-2">
                    <ul>
                      {page.chunks.map((chunk: any, idx: number) => (
                        <li key={idx}>{chunk}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chatbot Training Status */}
        <div className="mt-6">
          <Button onClick={() => setIsTraining(true)} disabled={isTraining} className="w-full">
            {isTraining ? "Training in progress..." : "Start Chatbot Training"}
          </Button>
        </div>
      </div>
    </div>
  );
}
