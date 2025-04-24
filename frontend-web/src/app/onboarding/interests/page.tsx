"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { updateUserProfile } from "@/lib/firestore";
import { getAuth } from "firebase/auth";

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

  const handleExpandAll = () => {
    setExpanded(Object.keys(groupedTopics));
  };

  const handleCollapseAll = () => {
    setExpanded([]);
  };

  const handleNext = async () => {
    const user = getAuth().currentUser;
    const interests = Object.values(selected).flat(); // Flatten grouped selections
    if (user) {
      await updateUserProfile(user.uid, { interests });
    } else {
      console.error("User is not authenticated.");
    }
    router.push(ROUTES.onboarding.premium);
  };

  const handleSelectAll = () => {
    const allSelected: Record<string, string[]> = {};
    for (const [category, topics] of Object.entries(groupedTopics)) {
      allSelected[category] = [...topics];
    }
    setSelected(allSelected);
  };

  const handleDeselectAll = () => {
    setSelected({});
  };

  const hasSelection = Object.values(selected).some((arr) => arr.length > 0);
  const allExpanded = expanded.length === Object.keys(groupedTopics).length;
  const allSelected = Object.entries(groupedTopics).every(
    ([cat, topics]) => selected[cat]?.length === topics.length
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 px-4 py-10">
      <h1 className="text-3xl font-semibold text-neutral-800 mb-6 text-center">
        What are you interested in?
      </h1>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={allExpanded ? handleCollapseAll : handleExpandAll}
          className="text-sm px-4 py-2 rounded border border-neutral-300 bg-white hover:bg-neutral-50"
        >
          {allExpanded ? "Collapse All" : "Expand All"}
        </button>
        <button
          onClick={allSelected ? handleDeselectAll : handleSelectAll}
          className="text-sm px-4 py-2 rounded border border-neutral-300 bg-white hover:bg-neutral-50"
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="w-full max-w-3xl space-y-5">
        {Object.entries(groupedTopics).map(([category, topics]) => {
          const isExpanded = expanded.includes(category);
          return (
            <div
              key={category}
              className="border border-neutral-300 rounded-lg p-4 bg-white transition hover:shadow-sm"
            >
              <button
                onClick={() => toggleCategory(category)}
                className="w-full text-left text-lg font-medium text-neutral-700 mb-3"
              >
                {category}
              </button>

              <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                {topics.map(topic => {
                  const isSelected = selected[category]?.includes(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => toggleTopic(category, topic)}
                      className={`px-3 py-2 text-sm rounded border transition ${
                        isSelected
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200"
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
        onClick={handleNext}
        disabled={!hasSelection}
        className={`mt-10 px-6 py-2 rounded-md text-sm font-semibold transition ${
          hasSelection
            ? "bg-black text-white hover:bg-neutral-900"
            : "bg-neutral-300 text-white cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}
