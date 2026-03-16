import type { App } from "astro/app";

/// <reference types="astro/client"/>

declare global{
    namespace App {
        interface Locals {
            token?: string;
        }
    }
}

export {};