export const fetchMetadata = async (url: string) => {
    try {
      const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch metadata:", error);
      return {};
    }
  };