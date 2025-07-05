import { FormWizard } from "@/components/form-wizard"
import { Button } from "@/components/ui/button"

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interior Design Project Wizard</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create your dream interior design project in just a few simple steps.
          </p>
        </header>
        <FormWizard />
      </div>
    </main>
  )
}
