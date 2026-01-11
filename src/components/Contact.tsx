import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter your message.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const webhookUrl = atob(
        "PUT IT HERE IN BASE64 AND DONT SHARE IT!"
      );

      const payload = {
        embeds: [
          {
            title: "📬 New Contact Form Submission",
            color: 0x1a1a1a,
            fields: [
              {
                name: "Name",
                value: formData.name,
                inline: true,
              },
              {
                name: "Email",
                value: formData.email,
                inline: true,
              },
              {
                name: "Message",
                value: formData.message,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "Portfolio Contact Form",
            },
          },
        ],
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later or reach out directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-xl mx-auto px-2 sm:px-0">
        <div
          ref={formRef}
          className={`transition-all duration-700 ${
            formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Get in Touch</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Have a project in mind? Let's talk about it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-8 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="name" className="text-xs sm:text-sm font-medium text-muted-foreground">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-muted-foreground/50 transition-colors text-sm sm:text-base h-10 sm:h-11"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="email" className="text-xs sm:text-sm font-medium text-muted-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-muted-foreground/50 transition-colors text-sm sm:text-base h-10 sm:h-11"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="message" className="text-xs sm:text-sm font-medium text-muted-foreground">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-muted-foreground/50 transition-colors resize-none text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading || isSuccess}
              className="w-full relative overflow-hidden group h-11 sm:h-12 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
