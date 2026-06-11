"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./Loader.css";
import Simulated_Logo from "@/assets/images/partner_logos/Simulated_Logo.png";

// Messages to cycle through
const messages = [
    "HUMAN-FIRST APPLICATIONS",
    "FOR SIMULATED WORLDS",
    "BOOTING BOTI BROWSER...",
    "INITIALIZING PRESENCE ENGINE...",
    "MAPPING SPATIAL LAYER..."
];

interface LoaderProps {
    isLoaded?: boolean;
    onComplete?: () => void;
}

export default function Loader({ isLoaded = false, onComplete }: LoaderProps) {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    // const [dateStr, setDateStr] = useState("MAY 2026");

    const isLoadedRef = useRef(isLoaded);
    useEffect(() => {
        isLoadedRef.current = isLoaded;
    }, [isLoaded]);

    const loaderLines = [
        "SIMULATED SYSTEMS INC.",
        "HUMAN-FIRST APPLICATIONS",
        "FOR SIMULATED WORLDS",
        "BOOTING BOTI BROWSER...",
        "INITIALIZING PRESENCE ENGINE...",
        "MAPPING SPATIAL LAYER...",
    ];

    // Typing effect for sequential lines
    useEffect(() => {
        if (currentLineIndex >= loaderLines.length) {
            // All lines have finished typing. If the page is loaded, finish loader.
            if (isLoadedRef.current) {
                const timeout = setTimeout(() => {
                    if (onComplete) onComplete();
                }, 335); // short delay after loading completes
                return () => clearTimeout(timeout);
            }
            return;
        }

        const currentLine = loaderLines[currentLineIndex];

        if (currentLine === "") {
            // Spacer line: immediately advance to next line with a brief delay
            const timeout = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, 150);
            return () => clearTimeout(timeout);
        }

        if (currentCharIndex < currentLine.length) {
            // Speed up header info lines vs action log lines
            const delay = currentLineIndex < 5 ? 15 : 20;
            const interval = setInterval(() => {
                setCurrentCharIndex((prev) => prev + 1);
            }, delay);
            return () => clearInterval(interval);
        } else {
            // Line typing is complete, wait a bit before starting the next line
            let delay = 200;
            if (currentLineIndex === 4) {
                delay = 650; // delay after date header before logs start
            } else if (currentLine.endsWith("...")) {
                delay = 650; // delay after boot logs for terminal simulation feel
            }

            const timeout = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, currentCharIndex, isLoaded]);

    return (
        <div className="loader-wrapper">
            {/* CRT scan lines and noise overlays */}
            <div className="static-noise-overlay" />

            <div className="loader-container">
                {/* Floating + vibrating logo */}
                <motion.div
                    animate={{
                        x: [0, -1, 1, -1, 1, 0, -1, 0, 1, -1, 0, -2], // jitter
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                    className="logo-container"
                >
                    <Image
                        src={Simulated_Logo}
                        alt="Logo"
                        height={100}
                        style={{ height: "auto", width: "auto" }}
                        priority
                    />
                </motion.div>

                {/* Left-aligned lines */}
                <div className="flex flex-col text-left font-['Press_Start_2P'] uppercase text-[#F5F5F5]">
                    {loaderLines.map((line, index) => {
                        if (index > currentLineIndex) return null;

                        const isCurrent = index === currentLineIndex;
                        const isLastLine = index === loaderLines.length - 1;
                        const isCompleted = index < currentLineIndex;

                        const textToShow = isCurrent ? line.slice(0, currentCharIndex) : line;

                        if (line === "") {
                            return <div key={index} className="h-4 sm:h-6 md:h-8" />;
                        }

                        // Show cursor if this is the active typing line,
                        // or if we've finished typing all lines and this is the last line.
                        const showCursor = isCurrent || (isCompleted && isLastLine && currentLineIndex >= loaderLines.length);

                        return (
                            <div
                                key={index}
                                className="text-[10px] sm:text-xs md:text-sm tracking-wider leading-loose min-h-[1.5rem] flex items-center"
                            >
                                <span>{textToShow}</span>
                                {showCursor && (
                                    <span className="typing-cursor ml-2 font-mono">█</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
