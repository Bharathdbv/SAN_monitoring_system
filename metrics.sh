#!/bin/bash

# Fetch system disk usage
echo "Disk Usage:"
df -h
echo "--------------------------------"

# Fetch IOPS stats using iostat
echo "IOPS and Read/Write Speeds:"
iostat -d 1 1  # Adjust this to your device (e.g., /dev/xvda)

# Fetch network traffic stats
echo "Network Traffic (Bytes Sent/Received):"
netstat -i eth0  # Adjust to your network interface (e.g., eth0)
echo
