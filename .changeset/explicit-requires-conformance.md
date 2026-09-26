---
"@napplet/conformance": patch
---

A `requires` tag naming a domain outside the known NAP list is now a warning (`manifest/requires-known`) instead of an error. `manifest/requires` still fails on non-bare forms such as `nap:relay` or `NAP-RELAY`.
