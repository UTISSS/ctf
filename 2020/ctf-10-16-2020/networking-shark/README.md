# Shark 100

To read the .pcapng file you can use [Wireshark](https://wwww.wireshark.org). After installing, click file -> open to open the pcap file. In Wireshark, you will see a mixture of both TCP and HTTP traffic. On the Info column of the TCP packets you can see SYN, SYN ACK, and ACK. This means that the packets are part of the [three-way handshakes](https://www.geeksforgeeks.org/tcp-3-way-handshake-process/),which is how computers figure out that they can talk to each other, and can be ignored. You can right click on the HTTP packet and click follow -> HTTP Stream. A window will pop up and show you the source code of the website. On the webpage is the flag. Using the follow stream tool in Wireshark is useful because it puts together complex protocols for you.