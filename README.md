# Interior Design Project Wizard

A responsive multi-step form wizard built with Next.js 15, TypeScript, and Tailwind CSS. This application guides users through creating an interior design project with a smooth, user-friendly experience.

## ✨ Features

- **Multi-step Form Wizard**: Three-step process for project creation
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Accessibility First**: WCAG compliant with proper ARIA labels, keyboard navigation, and screen reader support
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured data
- **Security Best Practices**: Input sanitization and validation
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean design with Tailwind CSS components

## 🚀 Form Steps

### Step 1: Project Details
- Project name (required)
- Project description (optional)
- Client-side validation with error handling

### Step 2: Room Type Selection
- Visual room type selection with cards
- 4 room types: Living Room, Bedroom, Kitchen, Office
- Optional room size selection (Small, Medium, Large)

### Step 3: Summary & Submit
- Review all entered information
- Submit to mock API endpoint
- Loading states and success feedback

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## 📦 Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```bash
├── app/
│   ├── api/submit-project/route.ts    # API endpoint for form submission
│   ├── projects/new/page.tsx          # Project creation wizard
│   ├── layout.tsx                     # Root layout with SEO metadata
│   ├── page.tsx                       # Main page component
│   └── globals.css                    # Global styles
├── components/
│   ├── form-wizard.tsx                # Main wizard component
│   ├── steps/
│   │   ├── project-details-step.tsx   # Step 1 component
│   │   ├── room-selection-step.tsx    # Step 2 component
│   │   └── summary-step.tsx           # Step 3 component
│   └── ui/                            # UI components
├── lib/
│   ├── room-data.ts                   # Room type definitions
│   ├── validation.ts                  # Form validation functions
│   └── utils.ts                       # Utility functions
├── types/
│   └── form.ts                        # TypeScript type definitions
└── README.md
```


## 🚀 Deployment

This project is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 🧪 Testing the Form

1. Fill out the project details in Step 1
2. Select a room type and optional size in Step 2
3. Review your information in Step 3
4. Submit the form to see the console output and success message

The form data will be logged to the browser console and sent to the mock API endpoint.

## 🔧 Customization

- **Room Types**: Modify \`lib/room-data.ts\` to add/remove room options
- **Validation**: Update \`lib/validation.ts\` for custom validation rules
- **Styling**: Customize the design in component files using Tailwind classes
- **Form Fields**: Add new fields by updating the TypeScript types and components

## 📄 License

This project is open source and available under the MIT License.

