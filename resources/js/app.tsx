import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import React, { ComponentType, ReactNode } from "react";
import Layout from "./Layouts/Layout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

type PageWithLayout = {
    default: ComponentType & {
        layout?: (page: ReactNode) => ReactNode;
    };
};
createInertiaApp({
    title: (title: string) => `${title} | Watch free movies on ${appName}`,
    resolve: (name: string) => {
        const pages = import.meta.glob<PageWithLayout>("./Pages/**/*.tsx", {
            eager: true,
        });
        const page = pages[`./Pages/${name}.tsx`];
        page.default.layout = (page) => <Layout children={page} />;
        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "red",
    },
});
