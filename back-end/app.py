
from flask import Flask, request
from flask_cors import CORS
from tapy import Indicators
from yahoo_fin.stock_info import get_data
import plotly.graph_objects as go
import numpy as np
import chart_studio
import chart_studio.plotly as py
import chart_studio.tools as tls
import ast
from datetime import datetime

# if __name__ == '__main__':
#     app.run(debug=True)

username = "chingrou"
api_key = "R6BGDTCwoOfxuKKYj8f3"
chart_studio.tools.set_credentials_file(username=username, api_key=api_key)

app = Flask(__name__)
CORS(app)


def testFunction1(input):
    return str(input)


@app.route('/testFunction/', methods=['GET'])
def testFunction():
    input = request.args.get('id', None)
    output = testFunction1(input)
    print(output)
    return output


def stratTest(stock, fractalIndicator, maIndicator, maPeriod, maSource, maOffset, capital, tpdetails, sldetails, ordersize):
    # GET DATA
    print(stock)
    # print([stock, indicator, capital, tpdetails,sldetails,ordersize])
    capital = int(capital)
    tpdetails = int(tpdetails)
    sldetails = int(sldetails)
    ordersize = int(ordersize)
    maPeriod = int(maPeriod)
    # maSource = int(maSource)
    # ordersize = int(ordersize)

    stock = stock.lower()
    df = get_data(stock, start_date="25/08/2020",
                  end_date="25/08/2021", index_as_date=False, interval="1d")
    df.rename(columns={'open': 'Open', 'high': 'High',
              'low': 'Low', 'close': 'Close'}, inplace=True)

    # try:
    #     indicator = ast.literal_eval(indicator)
    #     print(indicator)
    #     print(type(indicator))
    #     print(indicator['ma'])
    # except Exception as e:
    #     print(e)
    # print(indicator)
    # print(indicator['ma']['period'])
    i = Indicators(df)
    # if 'fractal' in indicator:
    i.fractals(column_name_high='fractals_high',
               column_name_low='fractals_low')
    # if 'ma' in indicator:
    i.sma(period=maPeriod, column_name='sma', apply_to=maSource)

    df = i.df
    # Creating orders
    orders = {}
    for index, row in df.iterrows():
        indicatorDirection = []

        rdate = row['date']
        ropen = row['Open']
        rhigh = row['High']
        rlow = row['Low']
        rclose = row['Close']
        # if 'fractal' in indicator:
        rfh = row['fractals_high']
        rfl = row['fractals_low']
        # if 'ma' in indicator:
        rsma = row['sma']

        # if sma agree
        # if 'ma' in indicator:
        if rsma < ropen:
            indicatorDirection.append(True)
        else:
            indicatorDirection.append(False)

        if rsma < rclose:
            indicatorDirection.append(True)
        else:
            indicatorDirection.append(False)

        # if 'fractal' in indicator:
        if rfl == True:
            indicatorDirection.append(True)
        else:
            indicatorDirection.append(False)

        toBuy = True
        for indicatorSignal in indicatorDirection:
            if indicatorSignal == False:
                toBuy = False

        if toBuy == True:
            tpPrice = ((tpdetails/100) + 1) * rclose
            slPrice = (1 - (sldetails/100)) * rclose

            cashToSpend = capital * (ordersize/100)
            quantity = cashToSpend//rclose
            totalCost = quantity*rclose
            if quantity != 0:
                orders[rdate] = [rclose, tpPrice, slPrice, quantity]
            # orders.append(orderDetail)

    # testing Orders
    allClosedTrades = []
    ordersOpen = {}
    for index, row in df.iterrows():
        rdate = row['date']
        ropen = row['Open']
        rhigh = row['High']
        rlow = row['Low']
        rclose = row['Close']
        # if 'fractal' in indicator:
        rfh = row['fractals_high']
        rfl = row['fractals_low']
        # if 'ma' in indicator:
        rsma = row['sma']

        try:
            orderdetails = orders[rdate]
            # openPrice = orderdetails[0]
            # tpPrice = orderdetails[1]
            # slPrice = orderdetails[2]
            ordersOpen[rdate] = orderdetails
            # print(orderdetails)
        except:
            None

        if ordersOpen != {}:
            closedTrades = []
            for orderDate in ordersOpen:
                openPrice = ordersOpen[orderDate][0]
                tpPrice = ordersOpen[orderDate][1]
                slPrice = ordersOpen[orderDate][2]
                qunatity = ordersOpen[orderDate][3]

                # check if tp
                if ropen >= tpPrice:
                    # tp
                    tradeDetail = [orderDate, openPrice,
                                   rdate, tpPrice, qunatity]
                    closedTrades.append(orderDate)
                    allClosedTrades.append(tradeDetail)
                elif rhigh >= tpPrice:
                    # tp
                    tradeDetail = [orderDate, openPrice,
                                   rdate, tpPrice, qunatity]
                    closedTrades.append(orderDate)
                    allClosedTrades.append(tradeDetail)
                elif rlow >= tpPrice:
                    # tp
                    tradeDetail = [orderDate, openPrice,
                                   rdate, tpPrice, qunatity]
                    closedTrades.append(orderDate)
                    allClosedTrades.append(tradeDetail)
                elif rclose >= tpPrice:
                    tradeDetail = [orderDate, openPrice,
                                   rdate, tpPrice, qunatity]
                    closedTrades.append(orderDate)
                    allClosedTrades.append(tradeDetail)

                # check if sl
                if ropen <= slPrice:
                    # tp
                    tradeDetail = [orderDate, openPrice,
                                   rdate, slPrice, qunatity]
                    closedTrades.append(orderDate)
                    allClosedTrades.append(tradeDetail)
                elif rhigh <= slPrice:
                    # tp
                    tradeDetail = [orderDate, openPrice,
                                   rdate, slPrice, qunatity]
                    closedTrades.append(orderDate)
                    allClosedTrades.append(tradeDetail)
                elif rlow <= slPrice:
                    # tp
                    tradeDetail = [orderDate, openPrice,
                                   rdate, slPrice, qunatity]
                    closedTrades.append(orderDate)
                    allClosedTrades.append(tradeDetail)
                elif rclose <= slPrice:
                    tradeDetail = [orderDate, openPrice,
                                   rdate, slPrice, qunatity]
                    closedTrades.append(orderDate)
                    allClosedTrades.append(tradeDetail)

            if closedTrades != []:
                if len(ordersOpen) == 1:
                    ordersOpen = {}
                else:
                    for close in closedTrades:
                        del ordersOpen[close]

    totalTradesMade = len(orders)
    totalWinCount = 0
    netProfitCount = 0
    res1 = []
    for tradeDetails in allClosedTrades:
        tpdetails
        sldetails
        if tradeDetails[1] < tradeDetails[3]:
            # win
            percentageChange = "+"+str(tpdetails)+"%"
            winOrLose = "Win"
            totalWinCount = totalWinCount + 1
        else:
            percentageChange = "-"+str(sldetails)+"%"
            winOrLose = "Lose"

        netProfit = (tradeDetails[3] - tradeDetails[1]) * int(tradeDetails[4])
        netProfitCount = netProfitCount + netProfit
        netProfit = str(round(netProfit, 2))

        strOpenPrice = str(round(tradeDetails[1], 2))
        strClosePrice = str(round(tradeDetails[3], 2))
        row = {'openDate': str(tradeDetails[0]), 'openPrice': strOpenPrice, 'closeDate': str(tradeDetails[2]), 'closePrice': strClosePrice, 'quantity': str(
            int(tradeDetails[4])), 'winOrLose': winOrLose, 'profit': netProfit, 'percentageChanged': percentageChange}
        res1.append(row)

    if totalWinCount != 0:
        winRate = (totalWinCount/totalTradesMade) * 100
        winRate = str(round(winRate, 2))
    else:
        winRate = '0'
    netProfitCount = str(round(netProfitCount, 2))
    winRate = winRate + "%"
    res2 = {'winRate': winRate, 'netProfit': netProfitCount}
    finalRes = {'tradeRecord': res1, 'testStats': res2}
    return finalRes


@app.route('/stratTest/', methods=['GET'])
def stratTestAPI():
    stock = request.args.get('stock', None)
    # indicator = {'fractal':{'whenToBuy':'immidately'}}
    # indicator = request.args.get('indicator', None)
    money = request.args.get('money', None)
    tpdetails = request.args.get('tpdetails', None)
    sldetails = request.args.get('sldetails', None)
    ordersize = request.args.get('ordersize', None)
    fractalIndicator = request.args.get('fractalIndicator', None)
    maIndicator = request.args.get('maIndicator', None)
    maPeriod = request.args.get('maPeriod', None)
    maSource = request.args.get('maSource', None)
    maOffset = request.args.get('maOffset', None)

    output = stratTest(stock, fractalIndicator, maIndicator, maPeriod,
                       maSource, maOffset, money, tpdetails, sldetails, ordersize)
    print(output)

    return output


def getPriceGraph(stock_symbol, indicators):
    data = get_data(stock_symbol, start_date="01/01/2021",
                    end_date="25/08/2021", index_as_date=False, interval="1d")
    data.rename(columns={'open': 'Open', 'high': 'High',
                'low': 'Low', 'close': 'Close'}, inplace=True)
    i = Indicators(data)
    if "fractals" in indicators:
        i.fractals()
        # data = i.df
    if "sma" in indicators:
        i.sma()
    data = i.df
    # print(data)

    my_layout = go.Layout({"showlegend": False})
    fig = go.Figure(data=[go.Candlestick(x=data['date'], open=data['Open'],
                    high=data['High'], low=data['Low'], close=data['Close'])], layout=my_layout)
    fig.update_layout(title=stock_symbol,
                      xaxis_rangeslider_visible=True, template="plotly_dark")
    fig.update_xaxes(title="Date")
    fig.update_yaxes(title="Price")

    if "fractals" in indicators:
        bullish_markers = []
        for index, row in data.iterrows():
            if row['fractals_low'] == True:
                bullish_markers.append(row['Low']*0.999)
            else:
                bullish_markers.append(np.nan)

        bearish_markers = []
        for index, row in data.iterrows():
            if row['fractals_high'] == True:
                bearish_markers.append(row['High']*1.001)
            else:
                bearish_markers.append(np.nan)
        data["bullish_markers"] = bullish_markers
        data["bearish_markers"] = bearish_markers
        fig.add_trace(go.Scatter(
            mode="markers", x=data["date"], y=data["bearish_markers"], marker_symbol="triangle-up", marker_color="red"))
        fig.add_trace(go.Scatter(
            mode="markers", x=data["date"], y=data["bullish_markers"], marker_symbol="triangle-down", marker_color="green"))
    if "sma" in indicators:
        fig.add_trace(
            go.Line(x=data["date"], y=data["sma"], line_color="yellow"))

    now = datetime.now()
    name = now.strftime(f"{stock_symbol}%H_%M_%S")
    link = py.plot(fig, filename=name, auto_open=False)
    html = tls.get_embed(link)

    link = link[:-1] + ".embed"
    return link


@app.route('/priceGraph/', methods=['GET'])
def getPriceGraphAPI():
    stock_symbol = request.args.get('stock_symbol', None)
    indicators = request.args.get('indicators', None)
    output = getPriceGraph(stock_symbol, indicators)
    print(output)
    return output


app.run(host='0.0.0.0', port=5000)
