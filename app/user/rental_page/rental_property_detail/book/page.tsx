"use client"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Facebook, Send } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">BookNow</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200">
            <Image src="/images/agent-profile.png" alt="Agent profile" fill className="object-cover" />
          </div>

          <h3 className="text-xl font-semibold">Song Lyna</h3>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" value="lyna@gmail.com" readOnly />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input id="phone" type="tel" value="0665755444" readOnly />
            </div>

            <div className="flex justify-center space-x-4 pt-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded bg-blue-600 text-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded bg-blue-400 text-white"
                aria-label="Telegram"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
