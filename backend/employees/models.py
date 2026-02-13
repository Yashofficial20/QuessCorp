from django.db import models


class Employee(models.Model):
    """
    Employee model representing an employee in the HRMS system.
    """
    employee_id = models.CharField(max_length=50, unique=True, blank=True)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    department = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        """
        Override save to auto-generate employee_id if not provided.
        """
        if not self.employee_id:
            # Get the last employee_id and increment
            last_employee = Employee.objects.all().order_by('id').last()
            if last_employee and last_employee.employee_id:
                # Extract number from last employee_id (e.g., EMP001 -> 1)
                try:
                    last_number = int(last_employee.employee_id.replace('EMP', ''))
                    new_number = last_number + 1
                except (ValueError, AttributeError):
                    # If format is unexpected, start from 1
                    new_number = Employee.objects.count() + 1
            else:
                new_number = 1
            
            # Format as EMP001, EMP002, etc.
            self.employee_id = f'EMP{new_number:03d}'
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"
