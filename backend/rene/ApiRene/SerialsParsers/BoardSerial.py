from . import BoardConst
from . import ErrorMessages


def set_category(serial):
    prem = "premium"
    wc = "world cup"
    sport = "sport"
    if serial[: BoardConst.year_last_index].lower() in BoardConst.premium_set:
        return prem
    elif serial[: BoardConst.year_last_index].lower() in BoardConst.wc_set:
        return wc
    else:
        return sport


def set_type(serial):
    for (k, v) in BoardConst.types_map.items():
        if str(serial[: BoardConst.year_last_index]).lower() in v:
            return k

    return "other"
def set_brand(serial):
    for (k,v) in BoardConst.brands_map.items():
        if str(serial[:BoardConst.year_last_index]).lower() in v:
            return k

def set_model(serial):
    return BoardConst.models_map[str(serial[: BoardConst.year_last_index]).lower()]


def set_year(serial):
    if BoardConst.previous_year == int(serial[BoardConst.year_last_index]):
        return 2019
    else:
        return 2020


def set_volume(serial):
    try:
        size_list = BoardConst.model_to_dict[
            serial[: BoardConst.year_last_index + 1].lower()
        ]
        volume = int(size_list[int(serial[BoardConst.volume_index])])
        return volume

    except:
        size_list = BoardConst.model_to_dict[
            serial[: BoardConst.year_last_index].lower()
        ]
        volume = int(size_list[int(serial[BoardConst.volume_index])])
        return volume


def check_number(serial):
    if len(serial) < 4:
        return ErrorMessages.too_short_serial_error
    elif len(serial) > 6:
        return ErrorMessages.too_long_serial_error
    elif not (
        serial[: BoardConst.year_last_index].lower() in BoardConst.models_map.keys()
    ):
        return ErrorMessages.model_serial_error
    elif not (int(serial[BoardConst.year_last_index]) in {2, 9}):
        return ErrorMessages.year_serial_error
    elif not (int(serial[BoardConst.volume_index])) in range(
        0, len(BoardConst.model_to_dict[serial[: BoardConst.year_last_index].lower()])
    ):
        return ErrorMessages.size_serial_error
    else:
        return ""
