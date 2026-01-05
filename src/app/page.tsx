import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <main className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Game Design Bootstrapper
          </h1>
          <p className="text-lg text-muted-foreground">
            A basic Next.js starter app with shadcn/UI and Tailwind CSS
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>
              This is a minimal Next.js application configured with:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Next.js 16 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS v4 for styling</li>
              <li>shadcn/UI component library</li>
              <li>Lucide React for icons</li>
            </ul>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>
              Useful resources for your game design project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col gap-2">
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                → Next.js Documentation
              </a>
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                → shadcn/UI Documentation
              </a>
              <a
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                → Tailwind CSS Documentation
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
