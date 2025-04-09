"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

const groupedTopics: Record<string, string[]> = {
  "Science & Technology": [
    "Technology",
    "AI & Machine Learning",
    "Science",
    "Space & Astronomy",
    "Cybersecurity",
  ],
  "Global & Political Affairs": [
    "Politics",
    "World News",
    "Global Conflicts",
    "Elections & Democracy",
    "Social Justice",
  ],
  "Health, Environment & Lifestyle": [
    "Health",
    "Environment",
    "Climate Change",
    "Food & Nutrition",
    "Lifestyle",
    "Psychology",
  ],
  "Education & Culture": [
    "Education",
    "Culture",
    "History",
    "Books & Literature",
    "Art & Design",
  ],
  "Business & Economics": ["Business", "Finance", "Startups", "Economics"],
  "Entertainment & Leisure": [
    "Entertainment",
    "Pop Culture",
    "Travel",
    "Sports",
  ],
};

export default function InterestsPage() {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [expanded, setExpanded] = useState<string[]>([]);
  const router = useRouter();

  const toggleCategory = (category: string) => {
    setExpanded((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleTopic = (category: string, topic: string) => {
    setSelected((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(topic)
        ? current.filter((t) => t !== topic)
        : [...current, topic];
      return { ...prev, [category]: updated };
    });
  };

  const hasSelection = Object.values(selected).some((arr) => arr.length > 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        What are you interested in?
      </h1>

      <div className="w-full max-w-3xl space-y-4">
        {Object.entries(groupedTopics).map(([category, topics]) => {
          const isExpanded = expanded.includes(category);
          return (
            <div
              key={category}
              className={`border rounded-lg p-4 bg-white shadow transition-all duration-300`}
            >
              <button
                onClick={() => toggleCategory(category)}
                className="w-full text-left text-lg font-semibold text-blue-700 mb-2"
              >
                {category}
              </button>

              <div
                className={`grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {topics.map((topic) => {
                  const isSelected = selected[category]?.includes(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => toggleTopic(category, topic)}
                      className={`px-3 py-2 rounded text-sm border transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-black hover:bg-gray-200"
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          console.log("User interests:", selected);
          router.push(ROUTES.onboarding.premium);
        }}
        disabled={!hasSelection}
        className="mt-8 bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
