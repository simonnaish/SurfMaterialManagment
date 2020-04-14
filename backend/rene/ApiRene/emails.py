from datetime import date
import json

from django.core.mail import send_mail
from django.http import BadHeaderError

from .models import Sail, Board, Beginners, Accessoriess


def send_report_ssl(request):  # make a new one in Django way
    login = "surfdeveloper@gmail.com"
    today = date.today().strftime("%Y-%m-%d")
    parsed_request_body = json.loads(request.body)
    what_material = parsed_request_body.pop("what_material")
    # from_date=parsed_request_body.pop("from_date")
    if "from_date" in parsed_request_body.keys():
        from_date = parsed_request_body.get("from_date")
        till_date = parsed_request_body.get("till_date")
        email_content = get_recently_arrived(what_material, from_date, till_date)
    else:
        email_content = get_recently_arrived(what_material, today)

    if "from_date" in parsed_request_body.keys():
        try:
            send_mail(
                "Report from %s until %s :" % (from_date, till_date),
                email_content,
                login,
                [login],
            )
            return True
        except BadHeaderError:
            return False
    else:
        try:
            send_mail("Report from %s :" % today, email_content, login, [login])
            return True
        except BadHeaderError:
            return False


def get_recently_arrived(what_material, from_date, till_date=0):
    sets_list = []
    type_key_list = []
    if till_date == 0:
        if "sail" in what_material:
            sail_set = (
                Sail.objects.filter(whenCame=from_date)
                .values()
                .order_by("model", "size")
            )
            sets_list.append(sail_set)
            type_key_list.append("Sails")
        if "board" in what_material:
            board_set = (
                Board.objects.filter(whenCame=from_date)
                .values()
                .order_by("model", "size")
            )
            sets_list.append(board_set)
            type_key_list.append("Boards")
        if "beginners" in what_material:
            beginner_set = (
                Beginners.objects.filter(whenCame=from_date)
                .values()
                .order_by("model", "size")
            )
            sets_list.append(beginner_set)
            type_key_list.append("Beginners material")
        if "accessories" in what_material:
            accessories_set = (
                Accessoriess.objects.filter(whenCame=from_date)
                .values()
                .order_by("model", "size")
            )
            sets_list.append(accessories_set)
            type_key_list.append("Accessories")
    else:
        if "sail" in what_material:
            sail_set = (
                Sail.objects.filter(whenCame__range=[from_date, till_date])
                .order_by("whenCame", "model", "size")
                .values()
            )
            sets_list.append(sail_set)
            type_key_list.append("Sails")

        if "board" in what_material:
            board_set = (
                Board.objects.filter(whenCame__range=[from_date, till_date])
                .order_by("whenCame", "model", "size")
                .values()
            )
            sets_list.append(board_set)
            type_key_list.append("Boards")

        if "beginners" in what_material:
            beginner_set = (
                Beginners.objects.filter(whenCame__range=[from_date, till_date])
                .order_by("whenCame", "model", "size")
                .values()
            )
            sets_list.append(beginner_set)
            type_key_list.append("Beginners material")

        if "accessories" in what_material:
            accessories_set = (
                Accessoriess.objects.filter(whenCame__range=[from_date, till_date])
                .order_by("whenCame", "model", "size")
                .values()
            )
            sets_list.append(accessories_set)
            type_key_list.append("Accessories")
    string_to_send = ""
    total_length = 0
    for item in enumerate(sets_list):
        total_length += len(item)

    if total_length == 0:

        string_to_send += "No material movement."
    else:
        for counter, item in enumerate(sets_list):
            if counter > 0:
                string_to_send += "\n\n"
            if len(item) > 0:
                string_to_send += type_key_list[counter] + ":\n"
                date_list = []
                for counter2, element in enumerate(item):
                    if element["whenCame"] not in date_list:
                        date_list.append(element["whenCame"])
                        if counter2 != 0:
                            string_to_send += "\n"
                        string_to_send += "\t\tDay: " + str(element["whenCame"]) + "\n"
                    if counter in [2, 3]:
                        string_to_send += (
                            element["type"]
                            + "\t"
                            + element["model"]
                            + "\t"
                            + str(element["size"])
                            + "\n"
                        )
                    else:
                        string_to_send += (
                            # type_key_list[counter]
                            # + "\t"
                            element["model"]
                            + "\t"
                            + str(element["size"])
                            + "\n"
                        )
    # return Response(string_to_send)
    return string_to_send
