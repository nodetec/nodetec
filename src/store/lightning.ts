import { SITE } from "../settings";

import { persistentAtom } from "@nanostores/persistent";

export const connected = persistentAtom<string>(`${SITE.title}_connected`, "false");
