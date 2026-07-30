#!/usr/bin/env python3
"""Generate TypeScript data file for deep well pump series from PDF catalog."""
import json

# ============================================================
# All series data extracted from 2022-AC deep well.pdf
# ============================================================

SERIES_DATA = {
    "2sdm07": {
        "name": "2SDM0.7 Series",
        "family": "2SD",
        "description": "Ultra-slim 2-inch submersible pump for narrow boreholes. Compact design with stainless steel construction.",
        "boreholeSize": '2"',
        "rpm": 2850,
        "flowLabels": [0, 0.12, 0.24, 0.36, 0.48, 0.60, 0.72, 0.84, 0.96],
        "models": [
            {"model": "2SDM0.7/26", "powerKw": 0.18, "hp": 0.25, "outlet": '1/2"', "voltage": "1~220-240V", "head": [30, 29, 27, 25, 23, 21, 18, 14, 8]},
            {"model": "2SDM0.7/32", "powerKw": 0.25, "hp": 0.33, "outlet": '1/2"', "voltage": "1~220-240V", "head": [38, 36, 34, 31, 29, 26, 22, 17, 10]},
            {"model": "2SDM0.7/38", "powerKw": 0.37, "hp": 0.50, "outlet": '1/2"', "voltage": "1~220-240V", "head": [45, 43, 40, 37, 34, 31, 26, 20, 12]},
        ]
    },
    "25sdm15": {
        "name": "2.5SDM1.5 Series",
        "family": "2.5SD",
        "description": "2.5-inch submersible pump delivering higher flow rates for shallow to medium depth wells.",
        "boreholeSize": '2.5"',
        "rpm": 2850,
        "flowLabels": [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4],
        "models": [
            {"model": "2.5SDM1.5/12", "powerKw": 0.18, "hp": 0.25, "outlet": '1"', "voltage": "1~220-240V", "head": [33, 31, 29, 27, 25, 21, 18, 13, 6]},
            {"model": "2.5SDM1.5/17", "powerKw": 0.25, "hp": 0.33, "outlet": '1"', "voltage": "1~220-240V", "head": [47, 44, 41, 38, 35, 30, 26, 19, 8]},
            {"model": "2.5SDM1.5/24", "powerKw": 0.37, "hp": 0.50, "outlet": '1"', "voltage": "1~220-240V", "head": [66, 62, 58, 54, 50, 43, 36, 26, 12]},
            {"model": "2.5SDM1.5/31", "powerKw": 0.55, "hp": 0.75, "outlet": '1"', "voltage": "1~220-240V", "head": [85, 80, 75, 70, 64, 55, 47, 34, 15]},
        ]
    },
    "3sd2": {
        "name": "3SD2 Series",
        "family": "3SD",
        "description": "3-inch submersible pump with 2 m³/h nominal flow. Ideal for domestic water supply and small irrigation.",
        "boreholeSize": '3"',
        "rpm": 2850,
        "flowLabels": [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7],
        "models": [
            {"model": "3SDM2/8", "threePhase": "3SD2/8", "powerKw": 0.18, "hp": 0.25, "outlet": '1"', "voltage": "both", "head": [35, 34, 34, 33, 32, 29, 26, 22, 17, 11]},
            {"model": "3SDM2/11", "threePhase": "3SD2/11", "powerKw": 0.25, "hp": 0.33, "outlet": '1"', "voltage": "both", "head": [48, 47, 47, 46, 44, 40, 36, 30, 24, 15]},
            {"model": "3SDM2/15", "threePhase": "3SD2/15", "powerKw": 0.37, "hp": 0.50, "outlet": '1"', "voltage": "both", "head": [65, 64, 64, 63, 60, 55, 49, 41, 33, 21]},
            {"model": "3SDM2/21", "threePhase": "3SD2/21", "powerKw": 0.55, "hp": 0.75, "outlet": '1"', "voltage": "both", "head": [91, 90, 90, 88, 84, 77, 68, 58, 46, 29]},
            {"model": "3SDM2/27", "threePhase": "3SD2/27", "powerKw": 0.75, "hp": 1.00, "outlet": '1"', "voltage": "both", "head": [117, 116, 115, 113, 107, 99, 88, 75, 59, 38]},
            {"model": "3SDM2/38", "threePhase": "3SD2/38", "powerKw": 1.10, "hp": 1.50, "outlet": '1"', "voltage": "both", "head": [164, 163, 163, 158, 151, 139, 124, 105, 82, 53]},
            {"model": "3SDM2/46", "threePhase": "3SD2/46", "powerKw": 1.50, "hp": 2.00, "outlet": '1"', "voltage": "both", "head": [199, 198, 197, 192, 183, 168, 150, 127, 100, 65]},
        ]
    },
    "3sd25": {
        "name": "3SD2.5 Series",
        "family": "3SD",
        "description": "3-inch submersible pump with 2.5 m³/h nominal flow. Balanced performance for residential and light commercial use.",
        "boreholeSize": '3"',
        "rpm": 2850,
        "flowLabels": [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0, 3.3, 3.6],
        "models": [
            {"model": "3SDM2.5/8", "threePhase": "3SD2.5/8", "powerKw": 0.25, "hp": 0.33, "outlet": '1"', "voltage": "both", "head": [32, 32, 31, 30, 30, 29, 27, 26, 24, 21, 18, 13, 8]},
            {"model": "3SDM2.5/11", "threePhase": "3SD2.5/11", "powerKw": 0.37, "hp": 0.50, "outlet": '1"', "voltage": "both", "head": [44, 43, 43, 42, 41, 39, 37, 35, 32, 29, 24, 18, 11]},
            {"model": "3SDM2.5/16", "threePhase": "3SD2.5/16", "powerKw": 0.55, "hp": 0.75, "outlet": '1"', "voltage": "both", "head": [64, 63, 62, 61, 59, 57, 54, 51, 47, 42, 35, 27, 16]},
            {"model": "3SDM2.5/21", "threePhase": "3SD2.5/21", "powerKw": 0.75, "hp": 1.00, "outlet": '1"', "voltage": "both", "head": [84, 83, 82, 80, 78, 75, 72, 68, 62, 56, 46, 35, 21]},
            {"model": "3SDM2.5/31", "threePhase": "3SD2.5/31", "powerKw": 1.10, "hp": 1.50, "outlet": '1"', "voltage": "both", "head": [124, 122, 121, 118, 115, 111, 106, 100, 91, 82, 68, 52, 31]},
            {"model": "3SDM2.5/37", "threePhase": "3SD2.5/37", "powerKw": 1.50, "hp": 2.00, "outlet": '1"', "voltage": "both", "head": [148, 146, 144, 141, 137, 132, 126, 119, 109, 98, 81, 62, 37]},
        ]
    },
    "3sd35": {
        "name": "3SD3.5 Series",
        "family": "3SD",
        "description": "3-inch submersible pump with 3.5 m³/h nominal flow. Higher output for larger residential and agricultural applications.",
        "boreholeSize": '3"',
        "rpm": 2850,
        "flowLabels": [0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6, 4.2, 4.8, 5.4],
        "models": [
            {"model": "3SDM3.5/6", "threePhase": "3SD3.5/6", "powerKw": 0.25, "hp": 0.33, "outlet": '1"', "voltage": "both", "head": [23, 23, 23, 22, 21, 20, 17, 14, 10, 5]},
            {"model": "3SDM3.5/9", "threePhase": "3SD3.5/9", "powerKw": 0.37, "hp": 0.50, "outlet": '1"', "voltage": "both", "head": [35, 34, 34, 33, 32, 29, 26, 21, 15, 8]},
            {"model": "3SDM3.5/12", "threePhase": "3SD3.5/12", "powerKw": 0.55, "hp": 0.75, "outlet": '1"', "voltage": "both", "head": [46, 46, 45, 45, 42, 39, 34, 28, 20, 11]},
            {"model": "3SDM3.5/16", "threePhase": "3SD3.5/16", "powerKw": 0.75, "hp": 1.00, "outlet": '1"', "voltage": "both", "head": [62, 61, 61, 59, 57, 52, 46, 37, 26, 14]},
            {"model": "3SDM3.5/24", "threePhase": "3SD3.5/24", "powerKw": 1.10, "hp": 1.50, "outlet": '1"', "voltage": "both", "head": [93, 92, 91, 89, 85, 78, 69, 56, 39, 21]},
            {"model": "3SDM3.5/28", "threePhase": "3SD3.5/28", "powerKw": 1.50, "hp": 2.00, "outlet": '1"', "voltage": "both", "head": [108, 107, 106, 104, 99, 91, 80, 65, 46, 25]},
        ]
    },
    "3sd4": {
        "name": "3SD4 Series",
        "family": "3SD",
        "description": "3-inch submersible pump with 4 m³/h nominal flow. Maximum output for 3-inch boreholes.",
        "boreholeSize": '3"',
        "rpm": 2850,
        "flowLabels": [0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6, 4.2, 4.8, 5.4, 6.0],
        "models": [
            {"model": "3SDM4/5", "threePhase": "3SD4/5", "powerKw": 0.25, "hp": 0.33, "outlet": '1"', "voltage": "both", "head": [18, 18, 18, 17, 17, 16, 15, 13, 11, 9, 6]},
            {"model": "3SDM4/7", "threePhase": "3SD4/7", "powerKw": 0.37, "hp": 0.50, "outlet": '1"', "voltage": "both", "head": [26, 25, 25, 24, 23, 22, 20, 18, 16, 12, 9]},
            {"model": "3SDM4/10", "threePhase": "3SD4/10", "powerKw": 0.55, "hp": 0.75, "outlet": '1"', "voltage": "both", "head": [37, 36, 35, 34, 33, 31, 29, 26, 22, 17, 12]},
            {"model": "3SDM4/13", "threePhase": "3SD4/13", "powerKw": 0.75, "hp": 1.00, "outlet": '1"', "voltage": "both", "head": [48, 47, 46, 45, 43, 41, 38, 34, 29, 23, 16]},
            {"model": "3SDM4/19", "threePhase": "3SD4/19", "powerKw": 1.10, "hp": 1.50, "outlet": '1"', "voltage": "both", "head": [70, 69, 67, 65, 63, 59, 55, 50, 42, 33, 23]},
            {"model": "3SDM4/23", "threePhase": "3SD4/23", "powerKw": 1.50, "hp": 2.00, "outlet": '1"', "voltage": "both", "head": [85, 83, 81, 79, 76, 72, 67, 60, 51, 40, 28]},
        ]
    },
    # ---- 4SD Series ----
    "4sd2": {
        "name": "4SD2 Series",
        "family": "4SD",
        "description": "4-inch submersible pump with 2 m³/h nominal flow. Popular for domestic water supply with excellent efficiency.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0, 3.3],
        "models": [
            {"model": "4SDM2-9", "threePhase": "4SD2-9", "powerKw": 0.37, "hp": 0.50, "outlet": '1¼"', "voltage": "both", "head": [63, 63, 63, 62, 59, 56, 52, 47, 42, 35, 27, 17]},
            {"model": "4SDM2-12", "threePhase": "4SD2-12", "powerKw": 0.55, "hp": 0.75, "outlet": '1¼"', "voltage": "both", "head": [84, 84, 84, 82, 79, 75, 69, 63, 56, 47, 36, 23]},
            {"model": "4SDM2-16", "threePhase": "4SD2-16", "powerKw": 0.75, "hp": 1.00, "outlet": '1¼"', "voltage": "both", "head": [112, 112, 112, 110, 105, 99, 92, 84, 74, 62, 48, 31]},
            {"model": "4SDM2-22", "threePhase": "4SD2-22", "powerKw": 1.10, "hp": 1.50, "outlet": '1¼"', "voltage": "both", "head": [155, 155, 153, 151, 145, 137, 127, 115, 102, 85, 66, 42]},
            {"model": "4SDM2-28", "threePhase": "4SD2-28", "powerKw": 1.50, "hp": 2.00, "outlet": '1¼"', "voltage": "both", "head": [197, 197, 195, 192, 184, 174, 161, 147, 130, 109, 84, 53]},
            {"model": "4SDM2-40", "threePhase": "4SD2-40", "powerKw": 2.20, "hp": 3.00, "outlet": '1¼"', "voltage": "both", "head": [281, 281, 279, 274, 263, 249, 230, 210, 185, 155, 120, 76]},
            {"model": "4SD2-52", "threePhase": "4SD2-52", "powerKw": 3.00, "hp": 4.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [366, 366, 362, 356, 342, 323, 299, 273, 241, 202, 156, 99]},
            {"model": "4SD2-65", "threePhase": "4SD2-65", "powerKw": 4.00, "hp": 5.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [457, 457, 453, 445, 427, 404, 374, 341, 301, 252, 195, 124]},
        ]
    },
    "4sd3": {
        "name": "4SD3 Series",
        "family": "4SD",
        "description": "4-inch submersible pump with 3 m³/h nominal flow. Versatile for domestic and light agricultural water supply.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6, 4.2, 4.8],
        "models": [
            {"model": "4SDM3-7", "threePhase": "4SD3-7", "powerKw": 0.37, "hp": 0.50, "outlet": '1¼"', "voltage": "both", "head": [50, 49, 47, 45, 41, 35, 28, 20, 10]},
            {"model": "4SDM3-10", "threePhase": "4SD3-10", "powerKw": 0.55, "hp": 0.75, "outlet": '1¼"', "voltage": "both", "head": [72, 70, 68, 64, 58, 50, 40, 28, 14]},
            {"model": "4SDM3-13", "threePhase": "4SD3-13", "powerKw": 0.75, "hp": 1.00, "outlet": '1¼"', "voltage": "both", "head": [93, 91, 88, 83, 76, 66, 53, 36, 18]},
            {"model": "4SDM3-18", "threePhase": "4SD3-18", "powerKw": 1.10, "hp": 1.50, "outlet": '1¼"', "voltage": "both", "head": [129, 126, 122, 115, 105, 91, 73, 50, 25]},
            {"model": "4SDM3-22", "threePhase": "4SD3-22", "powerKw": 1.50, "hp": 2.00, "outlet": '1¼"', "voltage": "both", "head": [158, 154, 149, 141, 128, 111, 89, 62, 31]},
            {"model": "4SDM3-30", "threePhase": "4SD3-30", "powerKw": 2.20, "hp": 3.00, "outlet": '1¼"', "voltage": "both", "head": [215, 210, 203, 192, 175, 151, 121, 84, 42]},
            {"model": "4SD3-40", "threePhase": "4SD3-40", "powerKw": 3.00, "hp": 4.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [287, 280, 271, 255, 234, 202, 162, 112, 56]},
            {"model": "4SD3-50", "threePhase": "4SD3-50", "powerKw": 4.00, "hp": 5.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [359, 350, 339, 319, 292, 252, 202, 140, 70]},
            {"model": "4SD3-62", "threePhase": "4SD3-62", "powerKw": 5.50, "hp": 7.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [445, 434, 420, 396, 362, 313, 251, 174, 87]},
        ]
    },
    "4sd4": {
        "name": "4SD4 Series",
        "family": "4SD",
        "description": "4-inch submersible pump with 4 m³/h nominal flow. Balanced performance for residential and commercial applications.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6, 4.2, 4.8, 5.4, 6.0],
        "models": [
            {"model": "4SDM4-6", "threePhase": "4SD4-6", "powerKw": 0.37, "hp": 0.50, "outlet": '1¼"', "voltage": "both", "head": [44, 42, 41, 40, 39, 36, 33, 29, 24, 19, 14]},
            {"model": "4SDM4-8", "threePhase": "4SD4-8", "powerKw": 0.55, "hp": 0.75, "outlet": '1¼"', "voltage": "both", "head": [58, 56, 55, 54, 52, 49, 44, 39, 33, 26, 18]},
            {"model": "4SDM4-10", "threePhase": "4SD4-10", "powerKw": 0.75, "hp": 1.00, "outlet": '1¼"', "voltage": "both", "head": [73, 70, 69, 67, 65, 61, 55, 48, 41, 32, 23]},
            {"model": "4SDM4-14", "threePhase": "4SD4-14", "powerKw": 1.10, "hp": 1.50, "outlet": '1¼"', "voltage": "both", "head": [102, 98, 96, 94, 91, 85, 77, 68, 57, 45, 32]},
            {"model": "4SDM4-18", "threePhase": "4SD4-18", "powerKw": 1.50, "hp": 2.00, "outlet": '1¼"', "voltage": "both", "head": [131, 127, 124, 121, 117, 109, 99, 87, 73, 58, 41]},
            {"model": "4SDM4-24", "threePhase": "4SD4-24", "powerKw": 2.20, "hp": 3.00, "outlet": '1¼"', "voltage": "both", "head": [174, 169, 165, 161, 156, 146, 132, 116, 98, 77, 55]},
            {"model": "4SD4-32", "threePhase": "4SD4-32", "powerKw": 3.00, "hp": 4.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [232, 225, 220, 215, 208, 195, 176, 155, 130, 103, 73]},
            {"model": "4SD4-40", "threePhase": "4SD4-40", "powerKw": 4.00, "hp": 5.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [290, 281, 275, 268, 260, 243, 220, 194, 163, 128, 92]},
            {"model": "4SD4-50", "threePhase": "4SD4-50", "powerKw": 5.50, "hp": 7.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [363, 352, 344, 335, 325, 304, 275, 242, 203, 160, 115]},
            {"model": "4SD4-62", "threePhase": "4SD4-62", "powerKw": 7.50, "hp": 10.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [450, 436, 426, 416, 403, 377, 341, 300, 252, 199, 142]},
        ]
    },
    "4sd6": {
        "name": "4SD6 Series",
        "family": "4SD",
        "description": "4-inch submersible pump with 6 m³/h nominal flow. Higher flow for agricultural irrigation and community water supply.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 1.2, 2.4, 3.6, 4.8, 6.0, 7.2, 8.4],
        "models": [
            {"model": "4SDM6-4", "threePhase": "4SD6-4", "powerKw": 0.37, "hp": 0.50, "outlet": '1¼"', "voltage": "both", "head": [26, 25, 23, 21, 19, 15, 10, 5]},
            {"model": "4SDM6-6", "threePhase": "4SD6-6", "powerKw": 0.55, "hp": 0.75, "outlet": '1¼"', "voltage": "both", "head": [39, 37, 34, 32, 28, 22, 15, 7]},
            {"model": "4SDM6-9", "threePhase": "4SD6-9", "powerKw": 0.75, "hp": 1.00, "outlet": '1¼"', "voltage": "both", "head": [59, 56, 51, 47, 42, 33, 23, 10]},
            {"model": "4SDM6-12", "threePhase": "4SD6-12", "powerKw": 1.10, "hp": 1.50, "outlet": '1¼"', "voltage": "both", "head": [79, 74, 69, 63, 57, 45, 30, 14]},
            {"model": "4SDM6-16", "threePhase": "4SD6-16", "powerKw": 1.50, "hp": 2.00, "outlet": '1¼"', "voltage": "both", "head": [105, 99, 91, 84, 75, 59, 40, 18]},
            {"model": "4SDM6-22", "threePhase": "4SD6-22", "powerKw": 2.20, "hp": 3.00, "outlet": '1¼"', "voltage": "both", "head": [144, 136, 126, 116, 104, 82, 55, 25]},
            {"model": "4SD6-30", "threePhase": "4SD6-30", "powerKw": 3.00, "hp": 4.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [197, 186, 171, 158, 141, 111, 75, 34]},
            {"model": "4SD6-38", "threePhase": "4SD6-38", "powerKw": 4.00, "hp": 5.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [249, 236, 217, 200, 179, 141, 95, 43]},
            {"model": "4SD6-46", "threePhase": "4SD6-46", "powerKw": 5.50, "hp": 7.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [302, 285, 263, 243, 217, 171, 115, 52]},
            {"model": "4SD6-55", "threePhase": "4SD6-55", "powerKw": 7.50, "hp": 10.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [361, 341, 314, 290, 259, 204, 138, 62]},
        ]
    },
    "4sd8": {
        "name": "4SD8 Series",
        "family": "4SD",
        "description": "4-inch submersible pump with 8 m³/h nominal flow. Medium-flow solution for irrigation and water transfer.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 1.2, 2.4, 3.6, 4.8, 6.0, 7.2, 8.4, 9.6, 10.8],
        "models": [
            {"model": "4SDM8-5", "threePhase": "4SD8-5", "powerKw": 0.55, "hp": 0.75, "outlet": '1¼"', "voltage": "both", "head": [32, 31, 28, 26, 25, 24, 22, 18, 14, 9]},
            {"model": "4SDM8-7", "threePhase": "4SD8-7", "powerKw": 0.75, "hp": 1.00, "outlet": '1¼"', "voltage": "both", "head": [44, 43, 39, 37, 35, 33, 30, 26, 20, 13]},
            {"model": "4SDM8-9", "threePhase": "4SD8-9", "powerKw": 1.10, "hp": 1.50, "outlet": '1¼"', "voltage": "both", "head": [57, 55, 51, 47, 45, 43, 39, 33, 26, 17]},
            {"model": "4SDM8-12", "threePhase": "4SD8-12", "powerKw": 1.50, "hp": 2.00, "outlet": '1¼"', "voltage": "both", "head": [76, 73, 67, 63, 60, 57, 52, 44, 34, 22]},
            {"model": "4SDM8-17", "threePhase": "4SD8-17", "powerKw": 2.20, "hp": 3.00, "outlet": '1¼"', "voltage": "both", "head": [107, 104, 96, 90, 85, 81, 74, 63, 48, 31]},
            {"model": "4SD8-23", "threePhase": "4SD8-23", "powerKw": 3.00, "hp": 4.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [145, 141, 129, 121, 115, 109, 100, 85, 65, 42]},
            {"model": "4SD8-29", "threePhase": "4SD8-29", "powerKw": 4.00, "hp": 5.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [183, 177, 163, 153, 145, 138, 126, 107, 82, 53]},
            {"model": "4SD8-37", "threePhase": "4SD8-37", "powerKw": 5.50, "hp": 7.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [234, 226, 208, 195, 185, 176, 160, 136, 105, 68]},
            {"model": "4SD8-45", "threePhase": "4SD8-45", "powerKw": 7.50, "hp": 10.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [284, 275, 253, 237, 225, 214, 195, 166, 128, 83]},
        ]
    },
    "4sd10": {
        "name": "4SD10 Series",
        "family": "4SD",
        "description": "4-inch submersible pump with 10 m³/h nominal flow. High-flow solution for commercial and agricultural applications.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 1.8, 3.6, 5.4, 7.2, 9.0, 10.8, 12.6, 14.4],
        "models": [
            {"model": "4SDM10-5", "threePhase": "4SD10-5", "powerKw": 0.75, "hp": 1.00, "outlet": '1½"', "voltage": "both", "head": [31, 30, 28, 27, 25, 22, 18, 13, 7]},
            {"model": "4SDM10-7", "threePhase": "4SD10-7", "powerKw": 1.10, "hp": 1.50, "outlet": '1½"', "voltage": "both", "head": [43, 42, 39, 38, 35, 31, 25, 18, 10]},
            {"model": "4SDM10-9", "threePhase": "4SD10-9", "powerKw": 1.50, "hp": 2.00, "outlet": '1½"', "voltage": "both", "head": [56, 54, 51, 48, 45, 40, 33, 23, 13]},
            {"model": "4SDM10-13", "threePhase": "4SD10-13", "powerKw": 2.20, "hp": 3.00, "outlet": '1½"', "voltage": "both", "head": [80, 77, 73, 70, 65, 57, 47, 34, 19]},
            {"model": "4SD10-18", "threePhase": "4SD10-18", "powerKw": 3.00, "hp": 4.00, "outlet": '1½"', "voltage": "3~380-415V", "head": [112, 108, 101, 97, 90, 79, 65, 46, 25]},
            {"model": "4SD10-22", "threePhase": "4SD10-22", "powerKw": 4.00, "hp": 5.50, "outlet": '1½"', "voltage": "3~380-415V", "head": [136, 132, 123, 119, 110, 97, 79, 57, 31]},
            {"model": "4SD10-28", "threePhase": "4SD10-28", "powerKw": 5.50, "hp": 7.50, "outlet": '1½"', "voltage": "3~380-415V", "head": [174, 168, 157, 151, 140, 123, 101, 72, 39]},
            {"model": "4SD10-36", "threePhase": "4SD10-36", "powerKw": 7.50, "hp": 10.00, "outlet": '1½"', "voltage": "3~380-415V", "head": [223, 216, 202, 191, 180, 158, 130, 93, 50]},
        ]
    },
    "4sd12": {
        "name": "4SD12 Series",
        "family": "4SD",
        "description": "4-inch submersible pump with 12 m³/h nominal flow. High-capacity for medium-scale irrigation and water supply.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 1.8, 3.6, 5.4, 7.2, 9.0, 10.8, 12.6, 14.4, 16.2],
        "models": [
            {"model": "4SDM12-4", "threePhase": "4SD12-4", "powerKw": 0.75, "hp": 1.00, "outlet": '2"', "voltage": "both", "head": [25, 24, 23, 21, 20, 18, 15, 13, 9, 5]},
            {"model": "4SDM12-6", "threePhase": "4SD12-6", "powerKw": 1.10, "hp": 1.50, "outlet": '2"', "voltage": "both", "head": [38, 36, 34, 32, 29, 26, 23, 19, 14, 8]},
            {"model": "4SDM12-8", "threePhase": "4SD12-8", "powerKw": 1.50, "hp": 2.00, "outlet": '2"', "voltage": "both", "head": [50, 48, 46, 43, 39, 35, 31, 25, 19, 10]},
            {"model": "4SDM12-12", "threePhase": "4SD12-12", "powerKw": 2.20, "hp": 3.00, "outlet": '2"', "voltage": "both", "head": [75, 72, 69, 64, 59, 53, 46, 38, 28, 15]},
            {"model": "4SD12-16", "threePhase": "4SD12-16", "powerKw": 3.00, "hp": 4.00, "outlet": '2"', "voltage": "3~380-415V", "head": [101, 96, 92, 86, 79, 71, 62, 51, 38, 21]},
            {"model": "4SD12-20", "threePhase": "4SD12-20", "powerKw": 4.00, "hp": 5.50, "outlet": '2"', "voltage": "3~380-415V", "head": [126, 120, 114, 107, 98, 88, 77, 63, 47, 26]},
            {"model": "4SD12-26", "threePhase": "4SD12-26", "powerKw": 5.50, "hp": 7.50, "outlet": '2"', "voltage": "3~380-415V", "head": [163, 156, 149, 139, 128, 115, 100, 82, 61, 33]},
            {"model": "4SD12-32", "threePhase": "4SD12-32", "powerKw": 7.50, "hp": 10.00, "outlet": '2"', "voltage": "3~380-415V", "head": [201, 192, 183, 171, 157, 141, 123, 101, 75, 41]},
        ]
    },
    "4sd16": {
        "name": "4SD16 Series",
        "family": "4SD",
        "description": "4-inch submersible pump with 16 m³/h nominal flow. Maximum output for 4-inch boreholes with high flow demand.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0],
        "models": [
            {"model": "4SDM16-4", "threePhase": "4SD16-4", "powerKw": 1.10, "hp": 1.50, "outlet": '2"', "voltage": "both", "head": [24, 23, 22, 20, 18, 15, 12, 9]},
            {"model": "4SDM16-6", "threePhase": "4SD16-6", "powerKw": 1.50, "hp": 2.00, "outlet": '2"', "voltage": "both", "head": [36, 35, 33, 30, 26, 22, 18, 13]},
            {"model": "4SDM16-9", "threePhase": "4SD16-9", "powerKw": 2.20, "hp": 3.00, "outlet": '2"', "voltage": "both", "head": [53, 52, 50, 45, 40, 33, 27, 19]},
            {"model": "4SD16-12", "threePhase": "4SD16-12", "powerKw": 3.00, "hp": 4.00, "outlet": '2"', "voltage": "3~380-415V", "head": [71, 70, 66, 60, 53, 45, 36, 26]},
            {"model": "4SD16-16", "threePhase": "4SD16-16", "powerKw": 4.00, "hp": 5.50, "outlet": '2"', "voltage": "3~380-415V", "head": [95, 93, 88, 80, 70, 60, 48, 35]},
            {"model": "4SD16-20", "threePhase": "4SD16-20", "powerKw": 5.50, "hp": 7.50, "outlet": '2"', "voltage": "3~380-415V", "head": [118, 116, 110, 100, 88, 74, 60, 43]},
            {"model": "4SD16-25", "threePhase": "4SD16-25", "powerKw": 7.50, "hp": 10.00, "outlet": '2"', "voltage": "3~380-415V", "head": [148, 145, 138, 125, 110, 93, 75, 54]},
        ]
    },
    # ---- 4SP Series ----
    "4sp2": {
        "name": "4SP2 Series",
        "family": "4SP",
        "description": "4-inch stainless steel submersible pump with 2 m³/h nominal flow. All-SS construction for superior corrosion resistance.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0],
        "models": [
            {"model": "4SPM2-9", "threePhase": "4SP2-9", "powerKw": 0.37, "hp": 0.50, "outlet": '1¼"', "voltage": "both", "head": [52, 51, 50, 48, 45, 42, 38, 34, 30, 25, 19]},
            {"model": "4SPM2-13", "threePhase": "4SP2-13", "powerKw": 0.55, "hp": 0.75, "outlet": '1¼"', "voltage": "both", "head": [76, 74, 72, 69, 65, 61, 55, 50, 43, 36, 27]},
            {"model": "4SPM2-18", "threePhase": "4SP2-18", "powerKw": 0.75, "hp": 1.00, "outlet": '1¼"', "voltage": "both", "head": [105, 103, 100, 95, 90, 84, 77, 69, 60, 50, 38]},
            {"model": "4SPM2-23", "threePhase": "4SP2-23", "powerKw": 1.10, "hp": 1.50, "outlet": '1¼"', "voltage": "both", "head": [134, 131, 127, 122, 115, 107, 98, 88, 77, 64, 48]},
            {"model": "4SPM2-33", "threePhase": "4SP2-33", "powerKw": 1.50, "hp": 2.00, "outlet": '1¼"', "voltage": "both", "head": [192, 188, 183, 175, 166, 154, 141, 126, 110, 91, 70]},
            {"model": "4SPM2-48", "threePhase": "4SP2-48", "powerKw": 2.20, "hp": 3.00, "outlet": '1¼"', "voltage": "both", "head": [280, 274, 266, 254, 241, 224, 205, 183, 160, 133, 101]},
            {"model": "4SP2-65", "threePhase": "4SP2-65", "powerKw": 3.00, "hp": 4.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [379, 371, 360, 344, 326, 303, 277, 248, 217, 180, 137]},
        ]
    },
    "4sp3": {
        "name": "4SP3 Series",
        "family": "4SP",
        "description": "4-inch stainless steel submersible pump with 3 m³/h nominal flow. Premium construction for demanding applications.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6, 4.2],
        "models": [
            {"model": "4SPM3-6", "threePhase": "4SP3-6", "powerKw": 0.37, "hp": 0.50, "outlet": '1¼"', "voltage": "both", "head": [37, 35, 34, 32, 29, 26, 22, 16]},
            {"model": "4SPM3-9", "threePhase": "4SP3-9", "powerKw": 0.55, "hp": 0.75, "outlet": '1¼"', "voltage": "both", "head": [56, 53, 50, 48, 44, 39, 32, 24]},
            {"model": "4SPM3-12", "threePhase": "4SP3-12", "powerKw": 0.75, "hp": 1.00, "outlet": '1¼"', "voltage": "both", "head": [75, 71, 67, 63, 59, 52, 43, 32]},
            {"model": "4SPM3-18", "threePhase": "4SP3-18", "powerKw": 1.10, "hp": 1.50, "outlet": '1¼"', "voltage": "both", "head": [112, 106, 101, 95, 88, 78, 65, 48]},
            {"model": "4SPM3-25", "threePhase": "4SP3-25", "powerKw": 1.50, "hp": 2.00, "outlet": '1¼"', "voltage": "both", "head": [155, 148, 140, 132, 123, 108, 90, 67]},
            {"model": "4SPM3-33", "threePhase": "4SP3-33", "powerKw": 2.20, "hp": 3.00, "outlet": '1¼"', "voltage": "both", "head": [205, 195, 185, 174, 162, 143, 119, 88]},
            {"model": "4SP3-45", "threePhase": "4SP3-45", "powerKw": 3.00, "hp": 4.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [280, 266, 252, 238, 221, 195, 162, 120]},
            {"model": "4SP3-60", "threePhase": "4SP3-60", "powerKw": 4.00, "hp": 5.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [373, 354, 336, 317, 294, 260, 216, 160]},
        ]
    },
    "4sp5": {
        "name": "4SP5 Series",
        "family": "4SP",
        "description": "4-inch stainless steel submersible pump with 5 m³/h nominal flow. High-head stainless steel solution.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6, 4.2, 4.8, 5.4, 6.0, 6.6],
        "models": [
            {"model": "4SPM5-4", "threePhase": "4SP5-4", "powerKw": 0.37, "hp": 0.50, "outlet": '1¼"', "voltage": "both", "head": [25, 25, 24, 23, 22, 21, 20, 19, 17, 15, 12, 9]},
            {"model": "4SPM5-6", "threePhase": "4SP5-6", "powerKw": 0.55, "hp": 0.75, "outlet": '1¼"', "voltage": "both", "head": [38, 37, 35, 34, 33, 31, 30, 28, 25, 22, 18, 13]},
            {"model": "4SPM5-8", "threePhase": "4SP5-8", "powerKw": 0.75, "hp": 1.00, "outlet": '1¼"', "voltage": "both", "head": [51, 49, 47, 45, 44, 42, 40, 37, 34, 29, 24, 18]},
            {"model": "4SPM5-12", "threePhase": "4SP5-12", "powerKw": 1.10, "hp": 1.50, "outlet": '1¼"', "voltage": "both", "head": [76, 74, 71, 68, 66, 63, 60, 56, 51, 44, 36, 27]},
            {"model": "4SPM5-17", "threePhase": "4SP5-17", "powerKw": 1.50, "hp": 2.00, "outlet": '1¼"', "voltage": "both", "head": [108, 104, 100, 96, 93, 89, 85, 79, 72, 62, 51, 38]},
            {"model": "4SPM5-25", "threePhase": "4SP5-25", "powerKw": 2.20, "hp": 3.00, "outlet": '1¼"', "voltage": "both", "head": [159, 153, 147, 142, 137, 131, 125, 117, 106, 92, 75, 56]},
            {"model": "4SP5-33", "threePhase": "4SP5-33", "powerKw": 3.00, "hp": 4.00, "outlet": '1¼"', "voltage": "3~380-415V", "head": [210, 202, 194, 187, 180, 173, 165, 154, 140, 121, 99, 74]},
            {"model": "4SP5-44", "threePhase": "4SP5-44", "powerKw": 4.00, "hp": 5.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [280, 270, 259, 249, 241, 231, 220, 205, 187, 161, 132, 99]},
            {"model": "4SP5-58", "threePhase": "4SP5-58", "powerKw": 5.50, "hp": 7.50, "outlet": '1¼"', "voltage": "3~380-415V", "head": [369, 356, 341, 329, 317, 304, 290, 271, 246, 213, 174, 130]},
        ]
    },
    "4sp8": {
        "name": "4SP8 Series",
        "family": "4SP",
        "description": "4-inch stainless steel submersible pump with 8 m³/h nominal flow. Premium medium-flow SS solution.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 1.2, 2.4, 3.6, 4.8, 6.0, 7.2, 8.4, 9.6, 10.8],
        "models": [
            {"model": "4SPM8-5", "threePhase": "4SP8-5", "powerKw": 0.75, "hp": 1.00, "outlet": '1½"', "voltage": "both", "head": [30, 28, 26, 25, 24, 23, 22, 20, 17, 14]},
            {"model": "4SPM8-7", "threePhase": "4SP8-7", "powerKw": 1.10, "hp": 1.50, "outlet": '1½"', "voltage": "both", "head": [42, 39, 37, 35, 34, 32, 31, 28, 24, 20]},
            {"model": "4SPM8-10", "threePhase": "4SP8-10", "powerKw": 1.50, "hp": 2.00, "outlet": '1½"', "voltage": "both", "head": [60, 56, 53, 50, 48, 46, 44, 40, 35, 29]},
            {"model": "4SPM8-15", "threePhase": "4SP8-15", "powerKw": 2.20, "hp": 3.00, "outlet": '1½"', "voltage": "both", "head": [90, 84, 79, 75, 72, 69, 66, 60, 52, 43]},
            {"model": "4SP8-18", "threePhase": "4SP8-18", "powerKw": 3.00, "hp": 4.00, "outlet": '1½"', "voltage": "3~380-415V", "head": [108, 100, 95, 91, 86, 83, 79, 72, 63, 51]},
            {"model": "4SP8-24", "threePhase": "4SP8-24", "powerKw": 4.00, "hp": 5.50, "outlet": '1½"', "voltage": "3~380-415V", "head": [144, 134, 126, 121, 115, 110, 105, 96, 84, 69]},
            {"model": "4SP8-36", "threePhase": "4SP8-36", "powerKw": 5.50, "hp": 7.50, "outlet": '1½"', "voltage": "3~380-415V", "head": [216, 201, 189, 181, 173, 166, 157, 144, 125, 103]},
        ]
    },
    "4sp14": {
        "name": "4SP14 Series",
        "family": "4SP",
        "description": "4-inch stainless steel submersible pump with 14 m³/h nominal flow. Maximum SS output for 4-inch boreholes.",
        "boreholeSize": '4"',
        "rpm": 2850,
        "flowLabels": [0, 1.8, 3.6, 5.4, 7.2, 9.0, 10.8, 12.6, 14.4, 16.2, 18.0],
        "models": [
            {"model": "4SPM14-5", "threePhase": "4SP14-5", "powerKw": 1.50, "hp": 2.00, "outlet": '1½"', "voltage": "both", "head": [34, 34, 32, 31, 30, 28, 27, 25, 21, 17, 11]},
            {"model": "4SPM14-7", "threePhase": "4SP14-7", "powerKw": 2.20, "hp": 3.00, "outlet": '1½"', "voltage": "both", "head": [48, 47, 45, 43, 41, 40, 38, 34, 30, 24, 16]},
            {"model": "4SP14-10", "threePhase": "4SP14-10", "powerKw": 3.00, "hp": 4.00, "outlet": '1½"', "voltage": "3~380-415V", "head": [69, 67, 64, 61, 59, 57, 54, 49, 42, 34, 23]},
            {"model": "4SP14-13", "threePhase": "4SP14-13", "powerKw": 4.00, "hp": 5.50, "outlet": '1½"', "voltage": "3~380-415V", "head": [89, 87, 83, 80, 77, 74, 70, 64, 55, 45, 30]},
            {"model": "4SP14-18", "threePhase": "4SP14-18", "powerKw": 5.50, "hp": 7.50, "outlet": '1½"', "voltage": "3~380-415V", "head": [124, 121, 114, 110, 107, 102, 97, 89, 76, 62, 41]},
            {"model": "4SP14-25", "threePhase": "4SP14-25", "powerKw": 7.50, "hp": 10.00, "outlet": '1½"', "voltage": "3~380-415V", "head": [172, 168, 159, 153, 148, 142, 135, 123, 106, 86, 57]},
        ]
    },
}

# 5SR Series data (all three-phase)
SR_SERIES = {
    "5sr8": {
        "name": "5SR8 Series",
        "family": "5SR",
        "description": "5-inch submersible pump with 8 m³/h nominal flow. Reliable three-phase operation for agricultural and municipal applications.",
        "boreholeSize": '5"',
        "rpm": 2850,
        "flowLabels": [0, 2.0, 4.0, 6.0, 8.0, 10.0],
        "models": [
            {"model": "5SR8-6", "powerKw": 1.10, "hp": 1.50, "outlet": '2"', "head": [71, 66, 59, 50, 34, 14]},
            {"model": "5SR8-7", "powerKw": 1.50, "hp": 2.00, "outlet": '2"', "head": [83, 77, 69, 58, 40, 16]},
            {"model": "5SR8-8", "powerKw": 2.20, "hp": 3.00, "outlet": '2"', "head": [95, 88, 79, 67, 45, 19]},
            {"model": "5SR8-12", "powerKw": 3.00, "hp": 4.00, "outlet": '2"', "head": [142, 132, 118, 100, 68, 28]},
            {"model": "5SR8-14", "powerKw": 4.00, "hp": 5.50, "outlet": '2"', "head": [166, 154, 138, 117, 79, 33]},
            {"model": "5SR8-20", "powerKw": 5.50, "hp": 7.50, "outlet": '2"', "head": [237, 220, 197, 167, 113, 47]},
            {"model": "5SR8-26", "powerKw": 7.50, "hp": 10.00, "outlet": '2"', "head": [308, 286, 256, 217, 147, 61]},
            {"model": "5SR8-31", "powerKw": 9.20, "hp": 12.50, "outlet": '2"', "head": [367, 341, 305, 258, 176, 72]},
        ]
    },
    "5sr12": {
        "name": "5SR12 Series",
        "family": "5SR",
        "description": "5-inch submersible pump with 12 m³/h nominal flow. Medium-capacity three-phase for larger water projects.",
        "boreholeSize": '5"',
        "rpm": 2850,
        "flowLabels": [0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0],
        "models": [
            {"model": "5SR12-4", "powerKw": 1.10, "hp": 1.50, "outlet": '2"', "head": [41, 38, 35, 33, 31, 27, 23, 17, 10]},
            {"model": "5SR12-5", "powerKw": 1.50, "hp": 2.00, "outlet": '2"', "head": [51, 48, 44, 41, 39, 34, 29, 21, 13]},
            {"model": "5SR12-6", "powerKw": 2.20, "hp": 3.00, "outlet": '2"', "head": [62, 57, 53, 50, 47, 41, 35, 26, 15]},
            {"model": "5SR12-9", "powerKw": 3.00, "hp": 4.00, "outlet": '2"', "head": [92, 85, 79, 74, 70, 61, 52, 38, 22]},
            {"model": "5SR12-11", "powerKw": 4.00, "hp": 5.50, "outlet": '2"', "head": [113, 105, 96, 91, 85, 74, 63, 47, 27]},
            {"model": "5SR12-15", "powerKw": 5.50, "hp": 7.50, "outlet": '2"', "head": [154, 143, 131, 124, 116, 101, 86, 64, 37]},
            {"model": "5SR12-20", "powerKw": 7.50, "hp": 10.00, "outlet": '2"', "head": [205, 190, 175, 165, 155, 135, 115, 85, 50]},
            {"model": "5SR12-23", "powerKw": 9.20, "hp": 12.50, "outlet": '2"', "head": [236, 219, 201, 190, 178, 155, 132, 98, 57]},
        ]
    },
    "5sr20": {
        "name": "5SR20 Series",
        "family": "5SR",
        "description": "5-inch submersible pump with 20 m³/h nominal flow. High-flow three-phase for large-scale irrigation and water transfer.",
        "boreholeSize": '5"',
        "rpm": 2850,
        "flowLabels": [0, 4.0, 8.0, 12.0, 16.0, 20.0, 24.0],
        "models": [
            {"model": "5SR20-5", "powerKw": 2.20, "hp": 3.00, "outlet": '2"', "head": [48, 42, 37, 32, 27, 21, 14]},
            {"model": "5SR20-7", "powerKw": 3.00, "hp": 4.00, "outlet": '2"', "head": [67, 59, 52, 45, 37, 29, 20]},
            {"model": "5SR20-9", "powerKw": 4.00, "hp": 5.50, "outlet": '2"', "head": [86, 76, 67, 58, 48, 38, 25]},
            {"model": "5SR20-11", "powerKw": 5.50, "hp": 7.50, "outlet": '2"', "head": [106, 92, 81, 70, 59, 46, 31]},
            {"model": "5SR20-14", "powerKw": 7.50, "hp": 10.00, "outlet": '2"', "head": [134, 118, 104, 90, 75, 59, 39]},
            {"model": "5SR20-17", "powerKw": 9.20, "hp": 12.50, "outlet": '2"', "head": [163, 143, 126, 109, 92, 71, 48]},
        ]
    },
}

SR6_SERIES = {
    "6sr10": {
        "name": "6SR10 Series",
        "family": "6SR",
        "description": "6-inch submersible pump with 10 m³/h nominal flow. Heavy-duty three-phase for municipal and industrial water supply.",
        "boreholeSize": '6"',
        "rpm": 2850,
        "flowLabels": [0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0],
        "models": [
            {"model": "6SR10-5", "powerKw": 3.00, "hp": 4.00, "outlet": '3"', "head": [72, 69, 66, 62, 58, 52, 43, 33, 23]},
            {"model": "6SR10-7", "powerKw": 4.00, "hp": 5.50, "outlet": '3"', "head": [101, 97, 93, 87, 81, 72, 61, 47, 32]},
            {"model": "6SR10-10", "powerKw": 5.50, "hp": 7.50, "outlet": '3"', "head": [145, 138, 132, 125, 116, 103, 87, 67, 45]},
            {"model": "6SR10-14", "powerKw": 7.50, "hp": 10.00, "outlet": '3"', "head": [202, 194, 185, 175, 162, 145, 122, 94, 63]},
            {"model": "6SR10-18", "powerKw": 9.20, "hp": 12.50, "outlet": '3"', "head": [260, 249, 238, 225, 208, 186, 157, 121, 81]},
            {"model": "6SR10-22", "powerKw": 11.00, "hp": 15.00, "outlet": '3"', "head": [318, 305, 291, 275, 255, 227, 191, 147, 100]},
            {"model": "6SR10-24", "powerKw": 13.00, "hp": 17.50, "outlet": '3"', "head": [347, 332, 317, 300, 278, 248, 209, 161, 109]},
            {"model": "6SR10-28", "powerKw": 15.00, "hp": 20.00, "outlet": '3"', "head": [405, 388, 370, 350, 324, 289, 244, 188, 127]},
        ]
    },
    "6sr18": {
        "name": "6SR18 Series",
        "family": "6SR",
        "description": "6-inch submersible pump with 18 m³/h nominal flow. Industrial-grade three-phase for heavy-duty applications.",
        "boreholeSize": '6"',
        "rpm": 2850,
        "flowLabels": [0, 3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 27.0],
        "models": [
            {"model": "6SR18-4", "powerKw": 3.00, "hp": 4.00, "outlet": '3"', "head": [57, 55, 53, 51, 47, 42, 36, 29, 21, 12]},
            {"model": "6SR18-5", "powerKw": 4.00, "hp": 5.50, "outlet": '3"', "head": [72, 69, 67, 64, 59, 53, 45, 36, 26, 15]},
            {"model": "6SR18-7", "powerKw": 5.50, "hp": 7.50, "outlet": '3"', "head": [101, 97, 94, 89, 83, 74, 64, 51, 37, 21]},
            {"model": "6SR18-9", "powerKw": 7.50, "hp": 10.00, "outlet": '3"', "head": [129, 124, 120, 114, 106, 95, 82, 66, 48, 27]},
            {"model": "6SR18-11", "powerKw": 9.20, "hp": 12.50, "outlet": '3"', "head": [158, 152, 147, 140, 130, 116, 100, 80, 58, 33]},
            {"model": "6SR18-13", "powerKw": 11.00, "hp": 15.00, "outlet": '3"', "head": [187, 179, 174, 165, 153, 137, 118, 95, 69, 39]},
            {"model": "6SR18-15", "powerKw": 13.00, "hp": 17.50, "outlet": '3"', "head": [216, 207, 201, 191, 177, 158, 136, 109, 79, 45]},
            {"model": "6SR18-18", "powerKw": 15.00, "hp": 20.00, "outlet": '3"', "head": [259, 248, 241, 229, 212, 190, 164, 131, 95, 54]},
        ]
    },
    "6sr30": {
        "name": "6SR30 Series",
        "family": "6SR",
        "description": "6-inch submersible pump with 30 m³/h nominal flow. High-volume three-phase for large-scale water projects.",
        "boreholeSize": '6"',
        "rpm": 2850,
        "flowLabels": [0, 5.0, 10.0, 15.0, 20.0, 25.0, 30.0, 35.0, 40.0],
        "models": [
            {"model": "6SR30-2", "powerKw": 3.00, "hp": 4.00, "outlet": '3"', "head": [29, 27, 25, 23, 21, 17, 14, 9, 4]},
            {"model": "6SR30-3", "powerKw": 4.00, "hp": 5.50, "outlet": '3"', "head": [43, 41, 38, 35, 31, 26, 20, 14, 5]},
            {"model": "6SR30-5", "powerKw": 5.50, "hp": 7.50, "outlet": '3"', "head": [71, 68, 63, 58, 52, 44, 34, 23, 9]},
            {"model": "6SR30-7", "powerKw": 7.50, "hp": 10.00, "outlet": '3"', "head": [100, 95, 88, 81, 73, 61, 47, 32, 13]},
            {"model": "6SR30-9", "powerKw": 9.20, "hp": 12.50, "outlet": '3"', "head": [129, 122, 113, 105, 94, 79, 64, 41, 16]},
            {"model": "6SR30-11", "powerKw": 11.00, "hp": 15.00, "outlet": '3"', "head": [157, 149, 139, 128, 114, 96, 75, 50, 20]},
            {"model": "6SR30-12", "powerKw": 13.00, "hp": 17.50, "outlet": '3"', "head": [172, 162, 151, 140, 125, 105, 81, 54, 22]},
            {"model": "6SR30-14", "powerKw": 15.00, "hp": 20.00, "outlet": '3"', "head": [200, 189, 176, 163, 146, 122, 95, 63, 25]},
        ]
    },
    "6sr45": {
        "name": "6SR45 Series",
        "family": "6SR",
        "description": "6-inch submersible pump with 45 m³/h nominal flow. Maximum-capacity three-phase for the most demanding water supply projects.",
        "boreholeSize": '6"',
        "rpm": 2850,
        "flowLabels": [0, 6.0, 12.0, 18.0, 24.0, 30.0, 36.0, 42.0, 48.0, 54.0, 60.0],
        "models": [
            {"model": "6SR45-2", "powerKw": 3.00, "hp": 4.00, "outlet": '3"', "head": [25, 24, 23, 22, 21, 20, 18, 16, 14, 11, 8]},
            {"model": "6SR45-3", "powerKw": 4.00, "hp": 5.50, "outlet": '3"', "head": [37, 36, 35, 33, 32, 30, 27, 24, 20, 16, 12]},
            {"model": "6SR45-4", "powerKw": 5.50, "hp": 7.50, "outlet": '3"', "head": [50, 48, 46, 44, 42, 39, 36, 32, 27, 22, 16]},
            {"model": "6SR45-5", "powerKw": 7.50, "hp": 10.00, "outlet": '3"', "head": [62, 60, 58, 55, 53, 49, 45, 40, 34, 27, 20]},
            {"model": "6SR45-6", "powerKw": 9.20, "hp": 12.50, "outlet": '3"', "head": [74, 72, 70, 67, 63, 59, 54, 48, 41, 33, 24]},
            {"model": "6SR45-7", "powerKw": 11.00, "hp": 15.00, "outlet": '3"', "head": [87, 84, 81, 78, 74, 69, 63, 56, 48, 38, 28]},
            {"model": "6SR45-8", "powerKw": 13.00, "hp": 17.50, "outlet": '3"', "head": [99, 96, 93, 89, 84, 79, 72, 64, 54, 44, 32]},
            {"model": "6SR45-9", "powerKw": 15.00, "hp": 20.00, "outlet": '3"', "head": [112, 108, 104, 100, 95, 89, 81, 72, 61, 49, 36]},
        ]
    },
}

SP6_SERIES = {
    "6sp17": {
        "name": "6SP17 Series",
        "family": "6SP",
        "description": "6-inch submersible pump with 17 m³/h nominal flow. Stainless steel construction with floating impeller design.",
        "boreholeSize": '6"',
        "rpm": 2850,
        "flowLabels": [0, 3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0],
        "models": [
            {"model": "6SP17-5", "powerKw": 3.00, "hp": 4.00, "outlet": '3"', "head": [54, 54, 53, 51, 48, 43, 37, 30, 20]},
            {"model": "6SP17-7", "powerKw": 4.00, "hp": 5.50, "outlet": '3"', "head": [76, 75, 74, 71, 67, 60, 52, 41, 29]},
            {"model": "6SP17-9", "powerKw": 5.50, "hp": 7.50, "outlet": '3"', "head": [97, 96, 95, 92, 86, 78, 67, 53, 37]},
            {"model": "6SP17-13", "powerKw": 7.50, "hp": 10.00, "outlet": '3"', "head": [141, 139, 137, 133, 124, 112, 97, 77, 53]},
            {"model": "6SP17-15", "powerKw": 9.20, "hp": 12.50, "outlet": '3"', "head": [162, 161, 158, 153, 143, 129, 112, 89, 61]},
            {"model": "6SP17-19", "powerKw": 11.00, "hp": 15.00, "outlet": '3"', "head": [206, 204, 201, 194, 182, 164, 141, 112, 78]},
            {"model": "6SP17-23", "powerKw": 13.00, "hp": 17.50, "outlet": '3"', "head": [249, 246, 243, 235, 220, 198, 171, 136, 94]},
            {"model": "6SP17-26", "powerKw": 15.00, "hp": 20.00, "outlet": '3"', "head": [281, 278, 274, 265, 248, 224, 194, 154, 106]},
        ]
    },
    "6sp30": {
        "name": "6SP30 Series",
        "family": "6SP",
        "description": "6-inch submersible pump with 30 m³/h nominal flow. High-volume SS design for agricultural irrigation.",
        "boreholeSize": '6"',
        "rpm": 2850,
        "flowLabels": [0, 6.0, 12.0, 18.0, 24.0, 30.0, 36.0, 42.0],
        "models": [
            {"model": "6SP30-3", "powerKw": 3.00, "hp": 4.00, "outlet": '3"', "head": [35, 34, 31, 29, 28, 24, 18, 11]},
            {"model": "6SP30-4", "powerKw": 4.00, "hp": 5.50, "outlet": '3"', "head": [47, 45, 42, 39, 37, 31, 23, 15]},
            {"model": "6SP30-6", "powerKw": 5.50, "hp": 7.50, "outlet": '3"', "head": [70, 67, 63, 59, 55, 47, 35, 23]},
            {"model": "6SP30-8", "powerKw": 7.50, "hp": 10.00, "outlet": '3"', "head": [93, 90, 84, 79, 74, 63, 47, 30]},
            {"model": "6SP30-10", "powerKw": 9.20, "hp": 12.50, "outlet": '3"', "head": [116, 112, 104, 98, 92, 79, 59, 38]},
            {"model": "6SP30-12", "powerKw": 11.00, "hp": 15.00, "outlet": '3"', "head": [140, 134, 125, 118, 110, 94, 70, 46]},
            {"model": "6SP30-14", "powerKw": 13.00, "hp": 17.50, "outlet": '3"', "head": [163, 157, 146, 138, 129, 110, 82, 53]},
            {"model": "6SP30-16", "powerKw": 15.00, "hp": 20.00, "outlet": '3"', "head": [186, 179, 167, 157, 147, 126, 94, 61]},
        ]
    },
    "6sp46": {
        "name": "6SP46 Series",
        "family": "6SP",
        "description": "6-inch submersible pump with 46 m³/h nominal flow. Heavy-duty SS design for large-scale agriculture and water transfer.",
        "boreholeSize": '6"',
        "rpm": 2850,
        "flowLabels": [0, 6.0, 12.0, 18.0, 24.0, 30.0, 36.0, 42.0, 48.0, 54.0, 60.0, 66.0],
        "models": [
            {"model": "6SP46-3", "powerKw": 3.00, "hp": 4.00, "outlet": '3"', "head": [41, 40, 39, 37, 35, 32, 30, 28, 25, 20, 15, 9]},
            {"model": "6SP46-4", "powerKw": 5.50, "hp": 7.50, "outlet": '3"', "head": [54, 53, 52, 49, 46, 43, 40, 37, 33, 27, 20, 12]},
            {"model": "6SP46-5", "powerKw": 7.50, "hp": 10.00, "outlet": '3"', "head": [68, 66, 65, 62, 58, 54, 50, 46, 41, 34, 25, 15]},
            {"model": "6SP46-6", "powerKw": 9.20, "hp": 12.50, "outlet": '3"', "head": [82, 80, 77, 74, 69, 65, 60, 55, 49, 41, 30, 18]},
            {"model": "6SP46-7", "powerKw": 11.00, "hp": 15.00, "outlet": '3"', "head": [95, 93, 90, 86, 81, 76, 70, 64, 58, 48, 36, 22]},
            {"model": "6SP46-8", "powerKw": 13.00, "hp": 17.50, "outlet": '3"', "head": [109, 106, 103, 99, 93, 87, 80, 74, 66, 55, 41, 25]},
            {"model": "6SP46-10", "powerKw": 15.00, "hp": 20.00, "outlet": '3"', "head": [136, 133, 129, 123, 116, 108, 100, 92, 82, 68, 51, 31]},
        ]
    },
    "6sp60": {
        "name": "6SP60 Series",
        "family": "6SP",
        "description": "6-inch submersible pump with 60 m³/h nominal flow. Maximum-capacity SS design for large-scale water projects.",
        "boreholeSize": '6"',
        "rpm": 2850,
        "flowLabels": [0, 6.0, 12.0, 18.0, 24.0, 30.0, 36.0, 42.0, 48.0, 54.0, 60.0, 66.0, 72.0, 78.0],
        "models": [
            {"model": "6SP60-3", "powerKw": 5.50, "hp": 7.50, "outlet": '3"', "head": [42, 42, 42, 41, 39, 36, 33, 31, 29, 26, 23, 20, 16, 11]},
            {"model": "6SP60-4", "powerKw": 7.50, "hp": 10.00, "outlet": '3"', "head": [56, 56, 56, 55, 52, 48, 44, 41, 39, 35, 31, 27, 21, 15]},
            {"model": "6SP60-5", "powerKw": 9.20, "hp": 12.50, "outlet": '3"', "head": [70, 70, 70, 68, 65, 60, 55, 52, 48, 44, 39, 33, 26, 18]},
            {"model": "6SP60-6", "powerKw": 11.00, "hp": 15.00, "outlet": '3"', "head": [84, 84, 84, 82, 78, 72, 66, 62, 58, 53, 47, 40, 31, 22]},
            {"model": "6SP60-7", "powerKw": 13.00, "hp": 17.50, "outlet": '3"', "head": [98, 98, 98, 96, 91, 84, 77, 72, 68, 62, 55, 47, 36, 26]},
            {"model": "6SP60-8", "powerKw": 15.00, "hp": 20.00, "outlet": '3"', "head": [112, 112, 112, 109, 104, 96, 88, 83, 77, 70, 62, 53, 42, 29]},
        ]
    },
}

OTHER_SERIES = {
    "4sk": {
        "name": "4SK Series",
        "family": "4SK",
        "description": "High-speed (8500 RPM) submersible pump with 100-150m head. Compact design for narrow boreholes with ultra-high efficiency.",
        "boreholeSize": '4"',
        "rpm": 8500,
        "flowLabels": [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7],
        "models": [
            {"model": "4SKM100", "powerKw": 0.75, "hp": 1.00, "outlet": '', "voltage": "1~220-240V", "head": [58, 52, 46, 40, 34, 28, 22, 16, 10, 5]},
            {"model": "4SKM150", "powerKw": 1.10, "hp": 1.50, "outlet": '', "voltage": "1~220-240V", "head": [100, 89, 79, 69, 59, 48, 38, 28, 17, 7]},
        ]
    },
    "qg": {
        "name": "QG Series",
        "family": "QG",
        "description": "Screw-type submersible pump with integrated motor. Ideal for clean water extraction from narrow boreholes with high head requirements.",
        "boreholeSize": '2"-4"',
        "rpm": 2850,
        "flowLabels": [0, 0.6, 1.2],  # Simplified - QG pumps have single head/flow rating
        "models": [
            {"model": "2QGD1-50-0.37", "powerKw": 0.37, "hp": 0.50, "outlet": '1"', "voltage": "1~220-240V", "maxHead": 50, "maxFlow": 1.0, "length": 680},
            {"model": "3QGD1.2-50-0.37", "powerKw": 0.37, "hp": 0.50, "outlet": '1"', "voltage": "1~220-240V", "maxHead": 50, "maxFlow": 1.2, "length": 560},
            {"model": "3QGD1.2-60-0.55", "powerKw": 0.55, "hp": 0.75, "outlet": '1"', "voltage": "1~220-240V", "maxHead": 60, "maxFlow": 1.2, "length": 600},
            {"model": "3QGD1.2-100-0.75", "powerKw": 0.75, "hp": 1.00, "outlet": '1"', "voltage": "1~220-240V", "maxHead": 100, "maxFlow": 1.2, "length": 680},
            {"model": "4QGD1.2-60-0.37", "powerKw": 0.37, "hp": 0.50, "outlet": '1"', "voltage": "1~220-240V", "maxHead": 60, "maxFlow": 1.2, "length": 534},
            {"model": "4QGD1.2-70-0.55", "powerKw": 0.55, "hp": 0.75, "outlet": '1"', "voltage": "1~220-240V", "maxHead": 70, "maxFlow": 1.2, "length": 571},
            {"model": "4QGD1.2-90-0.75", "powerKw": 0.75, "hp": 1.00, "outlet": '1"', "voltage": "1~220-240V", "maxHead": 90, "maxFlow": 1.2, "length": 632},
            {"model": "4QGD1.2-100-1.1", "powerKw": 1.10, "hp": 1.50, "outlet": '1"', "voltage": "1~220-240V", "maxHead": 100, "maxFlow": 1.2, "length": 652},
        ]
    },
}

# Generate the TypeScript file
output_path = "C:/Users/华为/.qclaw/workspace-37i6raipm851ul5j/alfagrand-next/src/data/deep-well-pump-series.ts"

with open(output_path, "w", encoding="utf-8") as f:
    f.write("""// ============================================================
// Deep Well Pump Series Data
// Source: 2022-AC deep well.pdf (YIWU CHANGHONG PUMP CO.,LTD)
// All model numbers and performance data extracted from official catalog
// ============================================================

export interface PerformancePoint {
  flow: number;  // m³/h
  head: number;  // m
}

export interface DeepWellModel {
  /** Single-phase model number (e.g., "4SDM2-9") */
  model: string;
  /** Three-phase model number (e.g., "4SD2-9"), if applicable */
  threePhase?: string;
  /** Motor power in kW */
  powerKw: number;
  /** Horsepower */
  hp: number;
  /** Outlet diameter */
  outlet: string;
  /** Voltage type */
  voltage: "1~220-240V" | "3~380-415V" | "both";
  /** Performance curve data points */
  performance: PerformancePoint[];
  /** Maximum head in meters (from performance data) */
  maxHead: number;
  /** Maximum flow in m³/h (from performance data) */
  maxFlow: number;
}

export interface DeepWellSeries {
  /** URL slug for the series page */
  slug: string;
  /** Display name */
  name: string;
  /** Series family for grouping */
  family: string;
  /** Description */
  description: string;
  /** Required borehole diameter */
  boreholeSize: string;
  /** Motor RPM */
  rpm: number;
  /** All models in this series */
  models: DeepWellModel[];
  /** Number of models */
  modelCount: number;
}

// Type guard to convert raw performance data to PerformancePoint[]
function toPerformance(flowLabels: number[], headValues: number[]): PerformancePoint[] {
  return flowLabels.map((flow, i) => ({ flow, head: headValues[i] ?? 0 }));
}

function makeSeries(
  slug: string,
  name: string,
  family: string,
  description: string,
  boreholeSize: string,
  rpm: number,
  flowLabels: number[],
  rawModels: Array<{
    model: string;
    threePhase?: string;
    powerKw: number;
    hp: number;
    outlet: string;
    voltage: "1~220-240V" | "3~380-415V" | "both";
    head: number[];
  }>
): DeepWellSeries {
  const models = rawModels.map(m => ({
    ...m,
    performance: toPerformance(flowLabels, m.head),
    maxHead: Math.max(...m.head.filter(h => h > 0)),
    maxFlow: flowLabels[flowLabels.length - 1] ?? 0,
  }));
  // Sort models by maxHead ascending
  models.sort((a, b) => a.maxHead - b.maxHead);
  return { slug, name, family, description, boreholeSize, rpm, models, modelCount: models.length };
}

function makeQGSeries(
  slug: string,
  name: string,
  family: string,
  description: string,
  boreholeSize: string,
  rpm: number,
  rawModels: Array<{
    model: string;
    powerKw: number;
    hp: number;
    outlet: string;
    voltage: "1~220-240V" | "3~380-415V" | "both";
    maxHead: number;
    maxFlow: number;
    length?: number;
  }>
): DeepWellSeries {
  const models = rawModels.map(m => ({
    model: m.model,
    powerKw: m.powerKw,
    hp: m.hp,
    outlet: m.outlet,
    voltage: m.voltage,
    maxHead: m.maxHead,
    maxFlow: m.maxFlow,
    performance: [] as PerformancePoint[],
  }));
  return { slug, name, family, description, boreholeSize, rpm, models, modelCount: models.length };
}

""")

    # Generate all series
    all_series = []
    
    for slug, data in SERIES_DATA.items():
        all_series.append(slug)
    
    for slug, data in SR_SERIES.items():
        all_series.append(slug)
    
    for slug, data in SR6_SERIES.items():
        all_series.append(slug)
    
    for slug, data in SP6_SERIES.items():
        all_series.append(slug)
    
    for slug, data in OTHER_SERIES.items():
        all_series.append(slug)

    # Write series data
    f.write("export const deepWellSeries: DeepWellSeries[] = [\n")
    
    for slug, data in SERIES_DATA.items():
        flow_labels_json = json.dumps(data["flowLabels"])
        models_json = json.dumps(data["models"], indent=2)
        f.write(f"""  makeSeries(
    "{slug}",
    {json.dumps(data['name'])},
    {json.dumps(data['family'])},
    {json.dumps(data['description'])},
    {json.dumps(data['boreholeSize'])},
    {data['rpm']},
    {flow_labels_json},
    {models_json}
  ),\n""")

    for slug, data in SR_SERIES.items():
        voltage_models = []
        for m in data["models"]:
            voltage_models.append({
                "model": m["model"],
                "powerKw": m["powerKw"],
                "hp": m["hp"],
                "outlet": m["outlet"],
                "voltage": "3~380-415V",
                "head": m["head"]
            })
        flow_labels_json = json.dumps(data["flowLabels"])
        models_json = json.dumps(voltage_models, indent=2)
        f.write(f"""  makeSeries(
    {json.dumps(slug)},
    {json.dumps(data['name'])},
    {json.dumps(data['family'])},
    {json.dumps(data['description'])},
    {json.dumps(data['boreholeSize'])},
    {data['rpm']},
    {flow_labels_json},
    {models_json}
  ),\n""")

    for slug, data in SR6_SERIES.items():
        voltage_models = []
        for m in data["models"]:
            voltage_models.append({
                "model": m["model"],
                "powerKw": m["powerKw"],
                "hp": m["hp"],
                "outlet": m["outlet"],
                "voltage": "3~380-415V",
                "head": m["head"]
            })
        flow_labels_json = json.dumps(data["flowLabels"])
        models_json = json.dumps(voltage_models, indent=2)
        f.write(f"""  makeSeries(
    {json.dumps(slug)},
    {json.dumps(data['name'])},
    {json.dumps(data['family'])},
    {json.dumps(data['description'])},
    {json.dumps(data['boreholeSize'])},
    {data['rpm']},
    {flow_labels_json},
    {models_json}
  ),\n""")

    for slug, data in SP6_SERIES.items():
        voltage_models = []
        for m in data["models"]:
            voltage_models.append({
                "model": m["model"],
                "powerKw": m["powerKw"],
                "hp": m["hp"],
                "outlet": m["outlet"],
                "voltage": "3~380-415V",
                "head": m["head"]
            })
        flow_labels_json = json.dumps(data["flowLabels"])
        models_json = json.dumps(voltage_models, indent=2)
        f.write(f"""  makeSeries(
    {json.dumps(slug)},
    {json.dumps(data['name'])},
    {json.dumps(data['family'])},
    {json.dumps(data['description'])},
    {json.dumps(data['boreholeSize'])},
    {data['rpm']},
    {flow_labels_json},
    {models_json}
  ),\n""")

    # 4SK series
    for slug, data in {"4sk": OTHER_SERIES["4sk"]}.items():
        voltage_models = []
        for m in data["models"]:
            voltage_models.append({
                "model": m["model"],
                "powerKw": m["powerKw"],
                "hp": m["hp"],
                "outlet": m.get("outlet", ""),
                "voltage": "1~220-240V",
                "head": m["head"]
            })
        flow_labels_json = json.dumps(data["flowLabels"])
        models_json = json.dumps(voltage_models, indent=2)
        f.write(f"""  makeSeries(
    {json.dumps(slug)},
    {json.dumps(data['name'])},
    {json.dumps(data['family'])},
    {json.dumps(data['description'])},
    {json.dumps(data['boreholeSize'])},
    {data['rpm']},
    {flow_labels_json},
    {models_json}
  ),\n""")

    # QG series (special format)
    qg_data = OTHER_SERIES["qg"]
    models_json = json.dumps(qg_data["models"], indent=2)
    f.write(f"""  makeQGSeries(
    "qg",
    {json.dumps(qg_data['name'])},
    {json.dumps(qg_data['family'])},
    {json.dumps(qg_data['description'])},
    {json.dumps(qg_data['boreholeSize'])},
    {qg_data['rpm']},
    {models_json}
  ),
""")

    f.write("];\n\n")

    # Helper: get series by slug
    f.write("""
export function getDeepWellSeries(slug: string): DeepWellSeries | undefined {
  return deepWellSeries.find(s => s.slug === slug);
}

/** Get all valid series slugs for generateStaticParams */
export function getAllSeriesSlugs(): string[] {
  return deepWellSeries.map(s => s.slug);
}

/** Total models across all series */
export const totalDeepWellModels = deepWellSeries.reduce((sum, s) => sum + s.modelCount, 0);

/** Series grouped by family */
export const seriesFamilies: { family: string; label: string; series: DeepWellSeries[] }[] = [
  { family: "2SD", label: "2-Inch SD Series", series: deepWellSeries.filter(s => s.family === "2SD") },
  { family: "2.5SD", label: "2.5-Inch SD Series", series: deepWellSeries.filter(s => s.family === "2.5SD") },
  { family: "3SD", label: "3-Inch SD Series", series: deepWellSeries.filter(s => s.family === "3SD") },
  { family: "4SD", label: "4-Inch SD Series", series: deepWellSeries.filter(s => s.family === "4SD") },
  { family: "4SP", label: "4-Inch SP Series (Stainless Steel)", series: deepWellSeries.filter(s => s.family === "4SP") },
  { family: "5SR", label: "5-Inch SR Series", series: deepWellSeries.filter(s => s.family === "5SR") },
  { family: "6SR", label: "6-Inch SR Series", series: deepWellSeries.filter(s => s.family === "6SR") },
  { family: "6SP", label: "6-Inch SP Series", series: deepWellSeries.filter(s => s.family === "6SP") },
  { family: "4SK", label: "4SK High-Speed Series", series: deepWellSeries.filter(s => s.family === "4SK") },
  { family: "QG", label: "QG Screw Pump Series", series: deepWellSeries.filter(s => s.family === "QG") },
].filter(g => g.series.length > 0);
""")

print(f"Generated: {output_path}")
print(f"Total series: {len(all_series)}")
print("Done!")
