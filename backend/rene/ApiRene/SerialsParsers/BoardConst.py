# CONST_INDEXES
year_last_index = -3
volume_index = -2
previous_year = 9

# Categories maps
premium_set = {
    "ig",
    "pf",
    "flp",
    "ssp",
    "ip",
    "fx",
    "dnp",
    "fo",
    "fp",
    "fwp",
    "kp",
    "mgp",
    "srp",
    "ukp",
    "uwp",
}
wc_set = {"fc", "fwc", "kc", "cc", "mgc", "src"}
sport_set = {"c", "mg", "mgf", "sr", "go", "ygm", "ygf", "kfl"}

#
#
# Avaible volumes lists
# from 2020

# premium:
ig_volume = [87, 93, 103]
pf_volume = [85, 92, 101]
fwp_volume = [79, 86, 94, 103, 113]
mgp_volume = [109, 119, 129, 139]
srp_volume = [92, 102, 116, 124, 132]
ssp_volume = [111, 122, 133]
ip_volume = [113, 123, 126]
fp_volume = [97, 107, 117, 127, 137]
dnp_volume = [85, 95, 105, 115]
fx_volume = [95, 105, 120, 140]
uwp_volume = []

# world cup:
fwc_volume = [86, 94, 103, 113]
kc_volume = [85, 95, 105, 115]
src_volume = [102, 116, 124, 132]
mgc_volume = [109, 119, 129, 139]
fc_volume = [97, 107, 117, 127, 137]
cc_volume = [101, 111, 122, 133, 144]

# sport:
c_volume = [101, 111, 122, 133, 144]
mg_volume = [119, 129, 139]
mgf_volume = [139, 149]
sr_volume = [116, 124, 132]
go_volume = [133, 144, 155]

# volumeSetOld
# premium:
ukp_volume = [78]
ssp9_volume = [101, 113, 125]
mgp9_volume = [97, 103, 113, 119, 130]
flp_volume = [85, 93, 103]
flpO_volume = [81]
fo_volume = [122]
kp_volume = [86, 94, 103, 109]
uwp9_volume = [83, 88, 94]

# wc
kc9_volume = [86, 94, 103, 109]
cc9_volume = [104, 114, 124, 131, 141]

# kids:
ygm_volume = [118]
ygf_volume = [80]
kfl_volume = [81]
ymg_volume = [112]

#
#
# Models dictionary

models_map = {
    "ig": "Ignite",
    "pf": "Freestyle",
    "flp": "Flare",
    "ssp": "Super Sport",
    "ip": "iSonic",
    "fx": "FOX",
    "dnp": "Dyno",
    "fo": "Starboard FOIL",
    "fp": "Futura",
    "fc": "Futura",
    "fwp": "Freestyle-Wave",
    "fwc": "Freestyle-Wave",
    "kp": "Kode",
    "kc": "Kode",
    "cc": "Carve",
    "c": "Carve",
    "mgp": "Magic Ride",
    "mgc": "Magic Ride",
    "mg": "Magic Ride",
    "mgf": "Magic Ride Family",
    "srp": "Super ride",
    "src": "Super ride",
    "sr": "Super ride",
    "go": "Go",
    "ygm": "Young Gun Magic Ride",
    "ygf": "Young Gun Freestyle",
    "kfl": "Kids Flare",
    "ukp": "UltraKode Boujma",
    "uwp": "Ultimate Wave",
}

types_map = {
    "freeride": [
        "c",
        "cc",
        "mg",
        "mgc",
        "mgp",
        "mgf",
        "sr",
        "src",
        "srp",
        "go",
        "ig",
        "dnp",
    ],
    "freestyle": ["ig", "pf", "flp", "kfl", "ygf"],
    "wave": ["dnp", "fwc", "fwp", "kp", "kc", "ukp", "uwp"],
    "junior": ["ygm", "ygf", "kfl"],
    "freerace": ["fx", "fc", "fp"],
    "slalom": ["ssp", "ip"],
    "foil": ["fo"],
}

model_to_dict = {
    "ig": ig_volume,
    "pf": pf_volume,
    "flp": flp_volume,
    "ssp": ssp_volume,
    "ip": ip_volume,
    "fx": fx_volume,
    "dnp": dnp_volume,
    "fo": fo_volume,
    "fp": fp_volume,
    "fwp": fwp_volume,
    "kp": kp_volume,
    "mgp": mgp_volume,
    "srp": srp_volume,
    "fc": fc_volume,
    "fwc": fwc_volume,
    "kc": kc_volume,
    "cc": cc_volume,
    "mgc": mgc_volume,
    "src": src_volume,
    "c": c_volume,
    "mg": mg_volume,
    "mgf": mgf_volume,
    "sr": sr_volume,
    "go": go_volume,
    "ygm": ygm_volume,
    "ygf": ygf_volume,
    "kfl": kfl_volume,
    "flpo": flpO_volume,
    "ssp9": ssp9_volume,
    "ukp": ukp_volume,
    "mgp9": mgp9_volume,
    "mgc9": mgp9_volume,
    "mg9": mgp9_volume,
    "cc9": cc9_volume,
    "c9": cc9_volume,
    "uwp": uwp_volume,
    "uwp": uwp9_volume,
}
