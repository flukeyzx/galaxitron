import { ListFilter, Search, Settings, Plus, Mic, ArrowUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Chat = () => {
  return (
    <aside className="flex flex-col h-full border-l border-primary/10 shadow-lg shadow-primary/20 bg-black/20 backdrop-blur-sm">
      <nav className="flex justify-between items-center w-full px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/80">New Chat</span>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <Search
            size={20}
            className="cursor-pointer hover:text-white transition-colors"
          />
          <ListFilter
            size={20}
            className="cursor-pointer hover:text-white transition-colors"
          />
          <Settings
            size={20}
            className="cursor-pointer hover:text-white transition-colors"
          />
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          <p>How can I help you today?</p>
        </div>
      </main>

      <div className="p-6">
        <div className="relative bg-white/5 rounded-3xl border border-white/10 focus-within:border-white/20 focus-within:bg-white/10 transition-all duration-300 flex flex-col">
          <Textarea
            placeholder="Chat with Galaxitron..."
            className="min-h-20 max-h-[200px] w-full bg-transparent border-none focus-visible:ring-0 resize-none px-4 pt-4 pb-2 text-base no-scrollbar placeholder:text-white/40"
          />

          <div className="flex justify-between items-center p-2">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full text-white/60 hover:text-white hover:bg-white/10"
              >
                <Plus size={20} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full text-white/60 hover:text-white hover:bg-white/10"
              >
                <Mic size={20} />
              </Button>
            </div>

            <div>
              <Button
                size="icon"
                className="h-9 w-9 rounded-full bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                j
              >
                <ArrowUp size={20} strokeWidth={2.5} />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="text-[10px] text-white/30">
            Galaxitron can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Chat;
