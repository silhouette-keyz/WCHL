import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; 2025 ProofAttend. All rights reserved.
            </div>
            <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Tentang</a>
            <a href="#" className="text-gray-400 hover:text-white">Kontak</a>
            <a href="#" className="text-gray-400 hover:text-white">Kebijakan Privasi</a>
            </div>
        </div>
    </footer>
  )
}
