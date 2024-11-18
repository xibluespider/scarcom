"use client";

export default function Loading() {
  return (
    <div className="absolute bg-black min-h-screen w-full flex flex-col items-center justify-center">
      <div className="border-gray-300 h-14 w-14 animate-spin rounded-full border-5 border-t-blue-600" />
    </div>
  );
}
