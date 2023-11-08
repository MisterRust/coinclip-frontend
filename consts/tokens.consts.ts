import { CARDANO_BACK_IMG, CARDANO_IMG, NEBULA_BACK_IMG, NEBULA_IMG, SNEK_BACK_IMG, SNEK_IMG } from "./image.consts";

export const TOKEN_ARRAY = {
    "ada": {
        value: "ADA",
        policy: "",
        asset: "",
        decimals: 6,
        choices: [
            5, 10, 25, 50, 75, 100
            // 1, 2, 3, 4, 5
        ],
        image: {
            "Heads": CARDANO_IMG,
            "Tails": CARDANO_BACK_IMG,
        },
        gifs: {
            "Heads": {
                "win": "/gifs/cardano_aa.gif",
                "fail": "/gifs/cardano_ab.gif"
            },
            "Tails": {
                "win": "/gifs/cardano_bb.gif",
                "fail": "/gifs/cardano_ba.gif"
            },
        }
    },
    "nebula": {
        value: "NEBULA",
        policyId: '3744d5e39333c384505214958c4ed66591a052778512e56caf420f62',
        asset: '4e4542554c41',
        decimals: 8,
        choices: [
            // 5000, 10000, 25000, 50000, 100000, 250000
            100, 200, 300, 400, 500
        ],
        image: {
            "Heads": NEBULA_IMG,
            "Tails": NEBULA_BACK_IMG,
        },
        gifs: {
            "Heads": {
                "win": "/gifs/nebula_aa.gif",
                "fail": "/gifs/nebula_ab.gif"
            },
            "Tails": {
                "win": "/gifs/nebula_bb.gif",
                "fail": "/gifs/nebula_ba.gif"
            },
        }

    },
    "snek": {
        value: "SNEK",
        policyId: '279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f',
        asset: '534e454b',
        decimals: 0,
        choices: [
            10000, 40000, 50000, 100000
            // 1000, 2000, 5000, 10000
        ],
        image: {
            "Heads": SNEK_IMG,
            "Tails": SNEK_BACK_IMG,
        },
        gifs: {
            "Heads": {
                "win": "/gifs/snek_aa.gif",
                "fail": "/gifs/snek_ab.gif"
            },
            "Tails": {
                "win": "/gifs/snek_bb.gif",
                "fail": "/gifs/snek_ba.gif"
            },
        }

    },
}