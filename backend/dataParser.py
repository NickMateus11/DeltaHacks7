def get_data(filename='historicalData.txt'):
    with open(filename,'r') as raw_file:
        lines = raw_file.readlines()
    for i in range(len(lines)):
        lines[i] = [entry.strip() for entry in lines[i].split(',')]
    json_data = []
    if len(lines) > 1:
        for i in range(1,len(lines)):
            json_data.append({lines[0][j]:lines[i][j] for j in range(len(lines[0]))})
    return json_data
