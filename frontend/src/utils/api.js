// src/utils/api.js

const API_BASE = "http://localhost:5000/api";

export async function api(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  // Extract token from options if it exists, so we can build the Authorization header
  const { token, ...customOptions } = options;

  try {
    const response = await fetch(url, {
      ...customOptions,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customOptions.headers,
      },
    });

    // 1. Check for 204 No Content (No JSON to parse)
    if (response.status === 204) return null;

    // 2. Check content type to avoid parsing non-JSON responses
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `Server Error (${response.status}). The server returned an invalid response format.`,
      );
    }

    // 3. Parse JSON
    const data = await response.json();

    // 4. Handle Backend Errors
    if (!response.ok) {
      throw new Error(data.error || data.message || "Request failed");
    }

    return data;
  } catch (error) {
    // Handle Network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Cannot connect to server. Please check if the backend is running.",
        { cause: error },
      );
    }
    // Re-throw so TanStack Query catches it
    throw error;
  }
}
