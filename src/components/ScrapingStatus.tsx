// components/ScrapingStatus.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const dummyData = [
  { url: "https://example.com/page1", status: "scraped", chunks: ["Chunk 1", "Chunk 2"] },
  { url: "https://example.com/page2", status: "pending", chunks: [] },
];

export default function ScrapingStatus() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Scraping Status</h2>
      <div className="space-y-2">
        {dummyData.map((page) => (
          <div key={page.url} className="p-4 border rounded">
            <p>URL: {page.url}</p>
            <p>Status: {page.status}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPage(page.url)}
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
      {selectedPage && (
        <div className="p-4 border rounded">
          <h3 className="font-bold">Scraped Data for {selectedPage}</h3>
          <ul>
            {dummyData.find((page) => page.url === selectedPage)?.chunks.map((chunk, index) => (
              <li key={index}>{chunk}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}