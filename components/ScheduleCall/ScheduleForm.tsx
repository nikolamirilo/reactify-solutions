//@ts-nocheck
'use client'
import { sendEmail } from "@/actions"
import { useDatePicker } from "@/context/DatePickerContext"
import { useState } from "react"
import { ImSpinner9 } from "react-icons/im";

export default function ScheduleForm({ setIsOpen }: { setIsOpen: any }) {
  const { selectedDate } = useDatePicker()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [subject, setSubject] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log('Form submitted:', { email, fullName, subject, selectedDate })
    const res = await sendEmail({ name: fullName, email, message: `I would like to schedule a call on date: ${selectedDate.toLocaleDateString()}.`, subject });
    if (res == true) {
      setIsOpen(true)
      setFullName("");
      setSubject("");
      setEmail("");
      setIsLoading(false)
    } else {
      alert("Error occured, please contact support");
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-opacity-5 bg-primaryColor text-dark shadow-lg rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none placeholder-dark  bg-gray-200 text-dark focus:ring-1  focus:border-primaryColor"
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-200 placeholder-dark text-dark focus:ring-1  focus:border-primaryColor"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Subject
          </label>
          <textarea
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-200 text-dark focus:ring-1 placeholder-dark focus:border-primaryColor min-h-[100px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Selected Date
          </label>
          <p className="text-sm text-gray-500">
            {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
          </p>
        </div>
        <button
          type="submit"
          className="w-full flex flex-row gap-1 justify-center items-center px-4 py-2 text-white font-medium rounded-md shadow-sm bg-primaryColor focus:outline-none transition-colors"
        >
          {isLoading ? <ImSpinner9 size={20} className="animate-spin" /> : null}

          Schedule Call
        </button>
      </div>
    </form>
  )
}

