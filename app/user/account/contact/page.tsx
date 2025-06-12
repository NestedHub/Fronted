"use client"

import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { X, Facebook, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200">
              <Image src="/images/contact-profile.png" alt="Song Lyna profile" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Song Lyna</h3>
            </div>
          </div>

          <div className="space-y-6">
            {/* Email Section */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value="lyna@gmail.com"
                readOnly
                className="bg-gray-50 border-gray-200 text-gray-600"
              />
            </div>

            {/* Phone Section */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                value="0985758444"
                readOnly
                className="bg-gray-50 border-gray-200 text-gray-600"
              />
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 pt-4">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                aria-label="Telegram"
              >
                <Send size={24} />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
