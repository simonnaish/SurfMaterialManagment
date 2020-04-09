from datetime import date

from django.core.mail import send_mail
from django.http import BadHeaderError


from .models import Sail, Board, Beginners, Accessoriess


def send_report_ssl(
    from_date="2020-04-05", till_date=date.today().strftime("%Y-%m-%d")
):  # make a new one in Django way
    login = "surfdeveloper@gmail.com"
    string_to_send = get_recently_arrived(from_date, till_date)
    if till_date == 0:
        try:
            send_mail("Report from %s :" % from_date, string_to_send, login, [login])
            return True
        except BadHeaderError:
            return False
    else:
        try:
            send_mail(
                "Report from %s until %s :" % (from_date, till_date),
                string_to_send,
                login,
                [login],
            )
            return True
        except BadHeaderError:
            return False

def send_testing_email(str):
    login = "surfdeveloper@gmail.com"

    try:
        send_mail("Report from  :",  str, login, [login])
        return True
    except BadHeaderError:
        return False

def get_recently_arrived(from_date, till_date=0):
    if till_date == 0:
        sail_set = Sail.objects.filter(whenCame=from_date).values().order_by('model', 'size')
        board_set = Board.objects.filter(whenCame=from_date).values().order_by('model', 'size')
        beginner_set = Beginners.objects.filter(whenCame=from_date).values().order_by('model', 'size')
        accessories_set = Accessoriess.objects.filter(whenCame=from_date).values().order_by('model', 'size')
    else:
        sail_set=Sail.objects.filter(whenCame__range=[from_date, till_date]).order_by('whenCame', 'model', 'size').values()
        board_set = Board.objects.filter(whenCame__range=[from_date,till_date]).order_by('whenCame', 'model', 'size').values()
        beginner_set=Beginners.objects.filter(whenCame__range=[from_date,till_date]).order_by('whenCame', 'model', 'size').values()
        accessories_set=Accessoriess.objects.filter(whenCame__range=[from_date,till_date]).order_by('whenCame', 'model', 'size').values()
        # print()

    sets_list = [sail_set, board_set, beginner_set, accessories_set]
    list_to_send = []
    string_to_send = ""
    type_key_list = ["Sails", "Boards", "Beginners material", "Accessories"]
    for counter, item in enumerate(sets_list):
        if counter > 0:
            string_to_send += "\n\n"
        string_to_send += type_key_list[counter] + ":\n"
        date_list=[]
        for counter2, element in enumerate(item):
            if(element['whenCame'] not in date_list):
                date_list.append(element['whenCame']);
                if(counter2!=0):
                    string_to_send += '\n'
                string_to_send+='\t\tDay: '+str(element['whenCame'])+'\n'
            if (counter in [2,3]):
                string_to_send += (
                    element['type']
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

    return string_to_send
