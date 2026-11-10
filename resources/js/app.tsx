import { createInertiaApp } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Ziggy } from './ziggy';

if (typeof window !== 'undefined') {
    (window as any).Ziggy = (window as any).Ziggy || Ziggy;
    (window as any).route = route;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./pages/**/*.{tsx,jsx}', {
    eager: true,
});

function resolvePage(name: string) {
    const page =
        pages[`./pages/${name}.tsx`] ??
        pages[`./pages/${name}.jsx`];

    if (!page) {
        throw new Error(
            `Page not found: ${name}. Check the file name and extension.`,
        );
    }

    return (page as { default: React.ComponentType }).default;
}
void createInertiaApp({
    resolve: (name) => resolvePage(name),
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
            case name.startsWith('teams/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
