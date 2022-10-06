import numpy as np
import queue
import copy
import matplotlib.pyplot as plt
# Input Parameters
total_time = int(input("Enter time for simulation (Hours): "))
IAT_rate = int(input("Enter Job Arrival Rate (/Hour): "))
ST_rate = int(input("Enter Job Service Rate (/Hour): "))
rho = IAT_rate/ST_rate
# Initialize Parameters
qu = queue.Queue()
-10,12 +18,8 
IAT = []
wait_time = []
server_busy = False
temp=0

# Input Parameters
total_time = int(input("Enter time for simulation (Hours): "))
IAT_rate = int(input("Enter Job Arrival Rate (/Hour): "))
ST_rate = int(input("Enter Job Service Rate (/Hour): "))
rho = IAT_rate/ST_rate
list_wait = []
list_delay = []

num_processes = int(np.random.poisson(IAT_rate)* total_time)
num_processes_served = 0
#@@-27,7 +31,7 @@
IAT.append(0)
#else:        
IAT.append(int(temp - temp%1))

# Populate Service-Times (ST) (where ST[i]!=0)
while not len(ST) == num_processes:
    temp = np.random.exponential(1/ST_rate)*60*60
#@@ -56,35 +60,37 @@
if ST[curr_process] == 0:
    server_busy = False
    num_processes_served = num_processes_served + 1
    
    for j in range(num_processes):
        if i== AT[j]:
            qu.put(j)
            if not server_busy and not qu.empty():
                curr_process = qu.get()
                server_busy = True

sum_wait = 0
sum_delay = 0
sum_wait = 0
sum_delay = 0

for i in range(num_processes_served):
    sum_wait = sum_wait + wait_time[i]
    sum_delay = sum_delay + wait_time[i] + ST_copy[i]

if num_processes_served == 0:
    list_wait.append(0)
    list_delay.append(0)
else:
    list_wait.append(sum_wait/(num_processes_served*60*60))  
    list_delay.append(sum_delay/(num_processes_served*60*60))

plt.plot([i+1 for i in range(total_time*60*60)], list_wait)
plt.ylabel("Avg Wait Times")
plt.show()

plt.plot([i+1 for i in range(total_time*60*60)], list_delay)
plt.ylabel("Avg Delay Times")
plt.show()


for i in range(num_processes):
    sum_wait = sum_wait + wait_time[i]
    sum_delay = sum_delay + wait_time[i] + ST_copy[i]

print("==============================================")
print("Number of Processes Served: ", num_processes_served)
print("Average Wait Time: ", sum_wait/(num_processes_served*60*60))        
print("Average Delay Time: ", sum_delay/(num_processes_served*60*60))   
print("==============================================")
#Formula Comparison
print('According to the formulas : ')
print("Average Wait Time: ", rho/((1-rho)*ST_rate))        
print('Average Delay Time : ', 1/((1-rho)*ST_rate))
print("==============================================")