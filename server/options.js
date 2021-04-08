export default {
    DEBUG: false,
    PORT: 8000,
    API: {
        SYSTEM: {
            PREFIX: "/api/system/",
            REALTIME: "realtime",
            HOSTNAME: "hostname",
            CPU: {
                PREFIX: "cpu/",
                DEFAULT: "cpu",
                USAGE: "usage"
            },
            RAM: {
                PREFIX: "ram/",
                DEFAULT: "ram",
                USAGE: "usage"
            },
            STORAGE: "storage",
            GRAPHICS: "graphics",
            INFO: "system",
            NETWORK: "network",
            RAW: {
                PREFIX: "raw/",
                OS: "os",
                CPU: "cpu"
            }
        },
        VIRTUALBOX: {
            PREFIX: "/api/",
            REALTIME: "realtime",
            MACHINES: {
                PREFIX: "machines/",
                LIST: "list",
                MACHINE: {
                    PREFIX: ":id/",
                    NAME: "name",
                    OS: "os",
                    IP: "ip",
                    MASK: "mask",
                    STATE: "state",
                    INFO: "info",
                    RUN: {
                        GR: "run/gr",
                        HL: "run/hl"
                    },
                    STOP: {
                        SV: "stop",
                        PO: "poweroff"
                    }
                }
            }
        }
    },
    LOGS: {
        DIRECTORY: "logs",
        TYPE: {
            ERRORS: "errors",
            INFO: "info"
        }
    },
    DB: {
        DIRECTORY: "db",
        DATA: "machines.json"
    }
}