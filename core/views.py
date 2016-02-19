from django.shortcuts import render
# from django.contrib.auth.models import User
from .models import Client, Job


def index(request):
    context = {}
    return render(request, 'core/index.html', context)


def clients(request):
    # Update to only get clients for this user
    # user = User.objects.get(username='admin')

    clients = Client.objects.all()

    all_clients = []
    for client in clients:
        cli = {
            'id': client.id,
            'first_name': client.first_name,
            'last_name': client.last_name,
            'company': client.company
        }
        all_clients.append(cli)

    context = {'clients': all_clients}
    return render(request, 'core/clients.html', context)


def client(request):
    context = {}
    return render(request, 'core/single-client.html', context)


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


def job(request):
    context = {}
    return render(request, 'core/single-job.html', context)


def search(request):
    context = {}
    return render(request, 'core/search.html', context)
