import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DownloadIcon, MoonIcon } from "@radix-ui/react-icons";

import { mc } from "@/utils/helpers";

import IconButton from "./common/IconButton";
import { Tooltip } from "./common/Tooltip";
import Button from "./common/Button";

type NavLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  isActive?: boolean;
};
function NavLink({ href, isActive, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      className={mc(
        "text-base leading-none py-2 px-5 font-medium",
        "relative z-0 text-background-11 hover:text-background-12 underline decoration-transparent underline-offset-8",
        isActive && "text-background-12 decoration-primary-9"
      )}
    >
      <span className="bg-inherit">{props.children}</span>
    </Link>
  );
}

function Logo() {
  return (
    <div className="flex-1 md:flex-initial">
      <Link href="/">
        <p className="text-2xl leading-none uppercase font-display">
          JeanTivan
        </p>
      </Link>
    </div>
  );
}

function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center">
      {pathname !== "/" ? <Logo /> : null}
      <nav className="hidden md:flex flex-1 justify-end items-center gap-4">
        <NavLink href="/" isActive={pathname === "/"}>
          About
        </NavLink>
        <NavLink href="/projects" isActive={pathname === "/projects"}>
          Projects
        </NavLink>
        <NavLink href="/contact" isActive={pathname === "/contact"}>
          Contact
        </NavLink>
        <Button as="a">
          Descargar CV{" "}
          <span className="inline-flex">
            <DownloadIcon />
          </span>
        </Button>
        <div className="flex gap-2">
          {/* TODO: Implementar cambio de Modo Oscuro */}
          <Tooltip content="Switch color mode">
            <IconButton label="Switch color mode" icon={MoonIcon} />
          </Tooltip>
        </div>
      </nav>
    </div>
  );
}

export default DesktopNav;
