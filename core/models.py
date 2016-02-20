from django.db import models
from django.utils import timezone


class Client(models.Model):
    """Model Client which stores the client details."""

    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    company = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=32)
    email = models.CharField(max_length=64)
    client_since = models.DateTimeField(blank=True, null=True)

    def add_client(self):
        """Method to save a new client."""
        self.client_since = timezone.now()
        self.save()

    def __str__(self):
        # This can be removed in the future and placed in the form or view using a lambda
        return "%s %s" % (self.first_name, self.last_name)


class Job(models.Model):
    """Model Job which stores the details of the job / project being performed
    for a specific client.
    """

    job_name = models.CharField(max_length=128)
    job_description = models.TextField()
    hourly_rate = models.IntegerField(blank=True, null=True)
    client = models.ForeignKey('Client')
    job_created = models.DateTimeField(blank=True, null=True)

    def add_job(self):
        """Method to save a new job."""
        self.job_created = timezone.now()
        self.save()

    def __str__(self):
        return self.job_name


class Task(models.Model):
    """Model Task which stores the details of the individual task being performed
    for a specific job. This model also keeps track of the time worked on a task.
    """

    task_name = models.CharField(max_length=128)
    task_description = models.TextField()
    task_time = models.TimeField()
    task_created = models.DateTimeField(blank=True, null=True)
    job = models.ForeignKey('Job')

    def add_task(self):
        """Method to add a new task."""
        self.task_created = timezone.now()
        self.save()

    def __str__(self):
        return self.task_name
