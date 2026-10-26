// Admin header — adapted from Shadcn Space dashboard-shell-01 site-header,
// user-dropdown and notification-dropdown, wired to TTS data and routes.
import { Link, useNavigate } from "react-router";
import { BellRing, SearchIcon, Settings, HelpCircle, LogOut, ExternalLink } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../contexts/AuthContext";
import { mockLatestMessages } from "../data/mockData";

const initials = (name = "Admin") =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

export default function SiteHeader({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const unread = mockLatestMessages.filter((m) => !m.read);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur sm:px-6">
      <SidebarTrigger className="-ml-1 size-8" aria-label="Toggle sidebar" />
      <Separator orientation="vertical" className="h-5" />
      <p className="truncate text-sm font-semibold text-foreground">{title}</p>

      <div className="ml-auto flex items-center gap-2">
        <InputGroup className="hidden h-9 w-64 rounded-lg bg-card md:flex">
          <InputGroupInput placeholder="Search…" aria-label="Search the admin console" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="relative grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label={`Notifications${unread.length ? `, ${unread.length} unread` : ""}`}
          >
            <BellRing className="size-4" />
            {unread.length > 0 && <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl p-0">
            <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold">Messages</span>
              <span className="rounded-md bg-primary px-1.5 text-xs font-semibold text-primary-foreground">{unread.length} new</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="m-0" />
            {mockLatestMessages.slice(0, 4).map((m) => (
              <DropdownMenuItem key={m.id} asChild className="cursor-pointer gap-3 rounded-none px-4 py-3">
                <Link to="/admin/contacts">
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white ${m.color}`}>{m.initials}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-sm ${m.read ? "" : "font-semibold"}`}>{m.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{m.message}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{m.time}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem asChild className="cursor-pointer justify-center rounded-none py-2.5 text-sm font-medium text-primary">
              <Link to="/admin/contacts">Open inbox</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full" aria-label="Account menu">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">{initials(user?.name)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 rounded-xl">
            <DropdownMenuLabel className="flex flex-col gap-0.5 py-2">
              <span className="text-sm font-semibold">{user?.name || "Admin"}</span>
              <span className="text-xs font-normal text-muted-foreground">{user?.email || user?.role}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer gap-2">
                <Link to="/admin/settings"><Settings /> Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer gap-2">
                <Link to="/admin/help"><HelpCircle /> Help Center</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer gap-2">
                <Link to="/" target="_blank" rel="noopener noreferrer"><ExternalLink /> View live site</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout} variant="destructive" className="cursor-pointer gap-2">
              <LogOut /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
