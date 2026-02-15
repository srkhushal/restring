import { browser } from "$app/environment";

type ThemeMode = "light" | "dark" | "system";

function createTheme() {
    let current = $state<ThemeMode>(
        (browser ? localStorage.getItem("theme") as ThemeMode : null) ?? "system"
    );

    const resolved = $derived.by(() => {
        if (current !== "system") return current;
        if (!browser) return "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    const applyToDOM = (v: string) => {
        if (browser) {
            document.documentElement.dataset.theme = v;
            document.documentElement.classList.toggle("dark", v === "dark");
        }
    };

    return {
        get value() { return current; },
        get active() { return resolved; },

        set(v: ThemeMode) {
            current = v;
            if (browser) {
                localStorage.setItem("theme", v);
                applyToDOM(resolved);
            }
        },

        toggle() {
            const cycle: Record<ThemeMode, ThemeMode> = {
                "dark": "light",
                "light": "system",
                "system": "dark"
            };
            this.set(cycle[current]);
        },

        init() {
            if (browser) {
                applyToDOM(resolved);
            }
        }
    };
}

export const theme = createTheme();