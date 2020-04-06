from . import SailConst


def set_category(serial):
    prem = "premium"
    wc = "world cup"
    if serial[:SailConst.serial_last_index].lower() in SailConst.premium_set:
        return prem
    else:
        return wc

def set_type(serial):
    for  (k,v) in  SailConst.type_map.items():
        if str(serial[:SailConst.serial_last_index]).lower() in v:
            return k
    return 'other'

def set_model(serial):
    return SailConst.models_map[str(serial[:SailConst.serial_last_index]).lower()]


def set_year(serial):
    if SailConst.year_index == int(serial[SailConst.size_last_index]):
        return 2019
    else:
        return 2020


def set_size(serial):
    size = int(serial[SailConst.serial_last_index:SailConst.size_last_index]) / 10

    return size


def check_number(serial):
    if (serial[:SailConst.serial_last_index]).lower() in SailConst.models_map.keys():
        if check_size(serial[SailConst.serial_last_index:SailConst.size_last_index], set_model(serial)):
            return True
        else:
            return False
    else:
        return False

def check_size(size, model):
    if size in SailConst.model_to_dict.get(model):
        return True
    else:
        return False
