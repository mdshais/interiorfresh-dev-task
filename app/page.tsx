import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center min-h-[80vh] flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Space with
            <span className="text-blue-600 block">Professional Design</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning interior designs with our intuitive project wizard. From concept to completion, we guide you
            through every step of your design journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              <Link href="/projects/new">Get Started Free</Link>
            </Button>
            
          </div>
        </div>
      </div>
    </main>
  )
}
