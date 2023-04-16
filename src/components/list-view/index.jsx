import { ActivityIndicator, Platform, Text, View } from 'react-native'

import React from 'react'
import { UltimateListView } from '@bang88/react-native-ultimate-listview'

class ListView extends React.PureComponent {
  static contextType = React.createContext({})

  refresh = () => {
    if (this.ulv) {
      this.ulv.refresh()
    }
  }
  render() {
    const { renderItem, ...props } = this.props

    // tslint:disable-next-line:variable-name
    const locale = {
      done: '已加载完',
      loading: '加载中...',
      refreshableTitlePull: '下拉刷新',
      refreshableTitleRelease: '释放加载',
      refreshableTitleRefreshing: '加载中...',
      noData: '暂无数据',
    }

    return (
      <UltimateListView
        key="ui-list-view"
        keyExtractor={(_, index) => `item-${index}`} // this is required when you are using FlatList
        refreshableMode={Platform.OS === 'ios' ? 'advanced' : 'basic'}
        numColumns={1}
        waitingSpinnerText={locale.loading}
        allLoadedText={locale.done}
        refreshableTitlePull={locale.refreshableTitlePull}
        refreshableTitleRelease={locale.refreshableTitleRelease}
        refreshableTitleRefreshing={locale.refreshableTitleRefreshing}
        emptyView={() => {
          return this.props.emptyView ? (
            this.props.emptyView()
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ textAlign: 'center', padding: '10%' }}>
                {locale.noData}
              </Text>
            </View>
          )
        }}
        customRefreshView={(status) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <ActivityIndicator />
              <Text style={{ marginLeft: 5 }}>
                {status === 0
                  ? locale.refreshableTitlePull
                  : status === 1
                  ? locale.refreshableTitleRelease
                  : locale.refreshableTitleRefreshing}
              </Text>
            </View>
          )
        }}
        {...props}
        item={renderItem}
        ref={(ref) => (this.ulv = ref)}
      />
    )
  }
}

export default ListView