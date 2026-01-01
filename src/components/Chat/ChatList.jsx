// components/Chat/ChatList.jsx
"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ChatList({ chats = [], selected, onSelect = () => {} }) {
  const [query, setQuery] = useState("");

  const filtered = chats.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.subtitle.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="absolute left-3 top-2 text-gray-500 w-5 h-5 flex items-center justify-center">🔎</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filtered.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">No conversations found</div>
        ) : (
            filtered.map((c) => (
            <div
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`px-4 py-3 cursor-pointer border-b border-gray-100 flex items-center ${selected === c.id ? "bg-gray-100" : "hover:bg-gray-50"}`}
            >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-gray-600 font-medium text-lg">{(c.title || "C").substring(0, 1).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-medium text-gray-900 truncate pr-2">{c.title}</h4>
                        <span className="text-xs text-gray-500 flex-shrink-0">{c.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 truncate pr-2">{c.last}</p>
                        {c.unread > 0 && <span className="bg-[#00a884] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{c.unread}</span>}
                    </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}

ChatList.propTypes = {
  chats: PropTypes.array,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
};
