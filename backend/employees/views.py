from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import IntegrityError
from .models import Employee
from .serializers import EmployeeSerializer


@api_view(['GET', 'POST'])
def employee_list_create(request):
    """
    List all employees or create a new employee.
    """
    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response(
                    {'error': 'Employee with this Employee ID already exists.'},
                    status=status.HTTP_409_CONFLICT
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def employee_delete(request, pk):
    """
    Delete an employee by ID.
    """
    try:
        employee = Employee.objects.get(pk=pk)
        employee.delete()
        return Response(
            {'message': 'Employee deleted successfully.'},
            status=status.HTTP_200_OK
        )
    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
