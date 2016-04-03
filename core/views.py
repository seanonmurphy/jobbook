from django.shortcuts import render, get_object_or_404
from django.views.generic import View
# from django.contrib.auth.models import User
from .models import Client, Job, Task


# TODO - update all to use class based views

class IndexView(View):
    """View for the index page."""

    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, 'core/index.html', context)


def clients(request):
    # Update to only get clients for this user
    # user = User.objects.get(username='admin')

    clients = Client.objects.all()

    all_clients = []
    for client in clients:
        related_jobs = Job.objects.filter(client=client)
        cli = {
            'id': client.id,
            'first_name': client.first_name,
            'last_name': client.last_name,
            'company': client.company,
            'jobs_count': len(related_jobs),
        }
        all_clients.append(cli)

    context = {'clients': all_clients}
    return render(request, 'core/clients.html', context)


def client_detail(request, client_id):
    client = get_object_or_404(Client, pk=client_id)

    related_jobs = Job.objects.filter(client=client)
    # TODO: update to show correct total time (sum time from all tasks of each job)

    # TODO: get all task from all realted jobs
    related_tasks = [Task.objects.filter(job=job) for job in related_jobs]

    context = {'client': client, 'jobs': related_jobs, 'tasks': related_tasks}
    return render(request, 'core/single-client.html', context)


def client_edit(request, client_id):
    pass


def client_new(request):
    pass


def jobs(request):
    jobs = Job.objects.all()

    all_jobs = []
    for job in jobs:
        j = {
            'id': job.id,
            'job_name': job.job_name,
            'job_description': job.job_description,
            'client': job.client
        }
        all_jobs.append(j)

    context = {'jobs': all_jobs}
    return render(request, 'core/jobs.html', context)


def job_detail(request, job_id):
    job = get_object_or_404(Job, pk=job_id)
    related_tasks = Task.objects.filter(job=job)

    context = {'job': job, 'tasks': related_tasks}
    return render(request, 'core/single-job.html', context)


def job_edit(request):
    pass


def job_new(request):
    pass


def search(request):
    context = {}
    return render(request, 'core/search.html', context)
