# CONST INDEX

serial_last_index = -5
size_last_index = -3

# year final variable to correct when codes in the company will be ready!!!
year_index = 9

brands_map = {
    "Severne": [
        "bl",
        "blp",
        "s1",
        "s1p",
        "gt",
        "gtp",
        "nc",
        "ncp",
        "tb",
        "ovd",
        "fr",
        "m3",
    ]
}

models_map = {
    "bl": "Blade",
    "blp": "Blade",
    "s1": "S1",
    "s1p": "S1",
    "gt": "Gator",
    "gtp": "Gator",
    "nc": "NCX",
    "ncp": "NCX",
    "tb": "Turbo",
    "ovd": "Overdrive",
    "fr": "Fr33k",
    "m3": "Mach3",
}

type_map = {
    "freeride": ["gt", "gtp"],
    "freestyle": ["fr"],
    "slalom": ["ovd", "m3"],
    "freerace": ["nc", "ncp", "tb"],
    "wave": ["bl", "blp", "s1p", "s1"],
}

premium_set = {"blp", "s1p", "gtp", "ncp", "tb", "ovd", "fr", "m3"}

bl_size_set = {
    "30",
    "33",
    "35",
    "37",
    "40",
    "42",
    "45",
    "47",
    "50",
    "53",
}  # have to update this shit
s1_size_set = {"36", "40", "44", "48", "52"}
fr_size_set = s1_size_set
gt_size_set = {"55", "57", "60", "65", "70", "75"}
nc_size_set = {"60", "65", "70", "75"}
tb_size_set = nc_size_set
ovd_size_set = {"62", "70", "78", "86"}
m3_size_set = {"50", "55", "62", "70", "78", "86"}

model_to_dict = {
    "Blade": bl_size_set,
    "Gator": gt_size_set,
    "Fr33k": s1_size_set,
    "S1": s1_size_set,
    "NCX": nc_size_set,
    "Turbo": tb_size_set,
    "Overdrive": ovd_size_set,
    "Mach3": m3_size_set,
}
