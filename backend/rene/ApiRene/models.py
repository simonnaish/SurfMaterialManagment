from django.db import models


class Sail(models.Model):
    serial = models.TextField(primary_key=True, max_length=8)
    type = models.TextField(editable=False, auto_created=True)
    category = models.TextField(editable=False, auto_created=True)
    model = models.TextField(editable=False, auto_created=True)
    size = models.FloatField(editable=False, auto_created=True)
    year = models.IntegerField(editable=False, auto_created=True)
    whenCame = models.DateField(auto_now_add=True)
    whenGone = models.DateField(null=True, blank=True)
    whenSold = models.DateField(null=True, blank=True)
    repair = models.BooleanField(default=False)
    sold = models.BooleanField(default=False)


class Board(models.Model):
    serial = models.TextField(primary_key=True, max_length=6)
    type = models.TextField(editable=False, auto_created=True)
    category = models.TextField(editable=False, auto_created=True)
    model = models.TextField(editable=False, auto_created=True)
    size = models.FloatField(editable=False, auto_created=True)
    year = models.IntegerField(editable=False, auto_created=True)
    whenCame = models.DateField(
        auto_now_add=True
    )  # default=timezone.now().strftime('%Y-%m-%d'))
    whenGone = models.DateField(null=True)
    whenSold = models.DateField(null=True)
    repair = models.BooleanField(default=False)
    sold = models.BooleanField(default=False)


class Beginners(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.TextField()  # Choices('Sail', 'Board') #Sail || Board
    model = models.TextField()
    size = models.TextField()
    whenCame = models.DateField(auto_now_add=True)
    whenGone = models.DateField(null=True, blank=True)
    gone = models.BooleanField(default=False)


class Accessoriess(models.Model):
    type = models.TextField()  # TODO change for TextChoices when know values
    model = models.TextField()
    size = models.TextField()
    whenCame = models.DateField(auto_now_add=True)
    whenGone = models.DateField(null=True, blank=True)
    gone = models.BooleanField(default=False)
