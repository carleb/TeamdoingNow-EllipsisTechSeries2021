
### DATABASE function
def getOHLCdata(stockId,tickTime,timePeriod):
    #timePeriod = 6m stands for 6months
    #tickTime = 1d stands for 1 day
    #stockId = aapl stands for apple
    ## for poc the time period will always be 6m and tick time alway 1d .. 

    res = []
    return res

### web function
def createPriceGraph(ohlcData, indicators):
    #ohlcData will be OHLC format in dict/list
    #indicators = {}  ## if blank means no indicator
    #indicators = {'fractal' : {'period':3},
    #               'simplemovingaverage' : {'length' : 9, 'source': 'close', 'offset': 0 }}

    ## only need to prepare for 3 indicators, fractal, simple moving average, macd
    ## google what are the inputs

    htmlOutput = "htmlbahbha"
    return htmlOutput





import requests

def getOHLCdataGET(stockName):
    url = "https://rhzgo8vip5.execute-api.us-east-1.amazonaws.com/default/doingNow-getOHLCdata?stockName="+str(stockName)
    response = requests.get(url)

    res = response.json()
    
    return res

def getChartHTML(stockName):
    url = "https://xfbu9b0wq9.execute-api.us-east-1.amazonaws.com/default/doingNow-getPriceChart?stockName="+str(stockName)
    response = requests.get(url)

    res = response.json()
    
    return res




apiTest = getOHLCdataGET("appl")
apiTest = getChartHTML("appl")



