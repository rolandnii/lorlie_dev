import { SafeHtml } from "@angular/platform-browser";

export interface TerminalInterface {
    command?: string,
    response?: SafeHtml | string,
}
