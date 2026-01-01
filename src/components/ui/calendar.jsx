"use client";

import * as React from "react";

/**
 * Compact Month/Year Picker
 * Minimal, space-efficient date picker
 */
export function MonthYearPicker({ value, onChange, placeholder = "Select month", disabled }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedMonth, setSelectedMonth] = React.useState("");
    const [selectedYear, setSelectedYear] = React.useState("");

    React.useEffect(() => {
        if (value) {
            const [year, month] = value.split("-");
            setSelectedYear(year);
            setSelectedMonth(month);
        }
    }, [value]);

    const months = [
        { value: "01", label: "Jan" },
        { value: "02", label: "Feb" },
        { value: "03", label: "Mar" },
        { value: "04", label: "Apr" },
        { value: "05", label: "May" },
        { value: "06", label: "Jun" },
        { value: "07", label: "Jul" },
        { value: "08", label: "Aug" },
        { value: "09", label: "Sep" },
        { value: "10", label: "Oct" },
        { value: "11", label: "Nov" },
        { value: "12", label: "Dec" },
    ];

    const currentYear = new Date().getFullYear();
    // Only show 20 years centered on current year
    const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

    const formatDisplay = () => {
        if (!selectedMonth || !selectedYear) return placeholder;
        const monthObj = months.find(m => m.value === selectedMonth);
        return `${monthObj?.label} ${selectedYear}`;
    };

    const handleSelect = (month, year) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        if (month && year) {
            onChange(`${year}-${month}`);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-left inline-flex items-center justify-between transition-all ${disabled
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200"
                        : "bg-white hover:bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    }`}
            >
                <span className={selectedMonth && selectedYear ? "text-slate-900" : "text-slate-400"}>
                    {formatDisplay()}
                </span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>

            {/* Compact Dropdown */}
            {isOpen && !disabled && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                    {/* Compact Picker - Shows ABOVE */}
                    <div className="absolute z-50 bottom-full mb-2 w-full bg-white rounded-lg border border-slate-200 shadow-xl">
                        {/* Minimal Header */}
                        <div className="bg-blue-600 text-white px-3 py-2 text-xs font-semibold">
                            {selectedMonth && selectedYear ? formatDisplay() : "Select Date"}
                        </div>

                        {/* Compact Content */}
                        <div className="p-2 space-y-2 max-h-64 overflow-y-auto">
                            {/* Months - Compact 4-column grid */}
                            <div className="grid grid-cols-4 gap-1">
                                {months.map((month) => (
                                    <button
                                        key={month.value}
                                        type="button"
                                        onClick={() => handleSelect(month.value, selectedYear || currentYear.toString())}
                                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${selectedMonth === month.value
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                                            }`}
                                    >
                                        {month.label}
                                    </button>
                                ))}
                            </div>

                            {/* Years - Compact 5-column grid */}
                            <div className="grid grid-cols-5 gap-1 max-h-32 overflow-y-auto">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        type="button"
                                        onClick={() => handleSelect(selectedMonth || "01", year.toString())}
                                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${selectedYear === year.toString()
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Minimal Footer */}
                        <div className="border-t border-slate-200 px-2 py-1 bg-slate-50 flex justify-between text-xs">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedMonth("");
                                    setSelectedYear("");
                                    onChange("");
                                    setIsOpen(false);
                                }}
                                className="text-slate-600 hover:text-slate-900 font-medium"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-1 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export const MonthPicker = MonthYearPicker;
