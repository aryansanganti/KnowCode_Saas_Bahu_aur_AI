import React, { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import Navbar from "./Navbar"

const ContactUs = () => {
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState("")

  const sendEmail = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("")

    try {
      if (formRef.current) {
        const result = await emailjs.sendForm(
          "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
          "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
          formRef.current,
          "YOUR_PUBLIC_KEY", // Replace with your EmailJS Public Key
        )
        if (result.text === "OK") {
          setStatus("Your message has been sent successfully!")
          formRef.current.reset()
        } else {
          setStatus("Failed to send your message. Please try again later.")
        }
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      setStatus("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFE3C2] p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#123524]">Contact Us</h1>
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="bg-[#85A947] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        >
          <div className="mb-4">
            <label className="block text-[#123524] text-sm font-bold mb-2" htmlFor="user_name">
              Name
            </label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#123524] leading-tight focus:outline-none focus:shadow-outline focus:border-[#3E7B27]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#123524] text-sm font-bold mb-2" htmlFor="user_email">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#123524] leading-tight focus:outline-none focus:shadow-outline focus:border-[#3E7B27]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#123524] text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#123524] leading-tight focus:outline-none focus:shadow-outline focus:border-[#3E7B27]"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#3E7B27] hover:bg-[#123524] text-[#EFE3C2] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
          {status && <p className="mt-4 text-sm text-[#123524]">{status}</p>}
        </form>
      </div>
    </>
  )
}

export default ContactUs

