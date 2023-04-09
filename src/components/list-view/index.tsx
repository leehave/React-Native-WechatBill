import { ActivityIndicator, Platform, Text, View } from 'react-native'

import React from 'react'
import { UltimateListView } from '@bang88/react-native-ultimate-listview'

type UltimateListViewProps = {
  initialNumToRender?: any
  horizontal?: any
  firstLoader?: any
  scrollEnabled?: any
  enableEmptySections?: any
  header?: any
  paginationFetchingView?: any
  paginationAllLoadedView?: any
  paginationWaitingView?: any
  emptyView?: any
  separator?: any
  refreshable?: any
  refreshableMode?: any
  refreshableTitle?: any
  refreshableColors?: any
  refreshableProgressBackgroundColor?: any
  refreshableSize?: any
  refreshableTintColor?: any
  customRefreshControl?: any
  refreshableTitlePull?: any
  refreshableTitleRefreshing?: any
  refreshableTitleRelease?: any
  customRefreshView?: any
  displayDate?: any
  dateFormat?: any
  dateTitle?: any
  arrowImageSource?: any
  arrowImageStyle?: any
  refreshViewStyle?: any
  dateStyle?: any
  refreshViewHeight?: any
  pagination?: any
  autoPagination?: any
  allLoadedText?: any
  spinnerColor?: any
  fetchingSpinnerSize?: any
  waitingSpinnerSize?: any
  waitingSpinnerText?: any
  paginationBtnText?: any
  numColumns?: any
}
export interface ListViewProps<T> extends UltimateListViewProps {
  children?: React.ReactNode
  onFetch: (
    currentPage: number,
    startFetch: (rows: T[], limit: number) => any,
    abortFetch: () => void,
  ) => void
  renderItem: (
    item: T,
    index: number,
    separators: {
      highlight: () => void
      unhighlight: () => void
      updateProps: (select: 'leading' | 'trailing', newProps: any) => void
    },
  ) => React.ReactElement<any> | null
  numColumns?: number
  keyExtractor?: (item: T, index: number) => string
}
export interface ListViewState {}
class ListView<T> extends React.PureComponent<ListViewProps<T>, ListViewState> {
  static contextType = React.createContext({})
  ulv: { refresh: () => void}  | undefined

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
        keyExtractor={(_: any, index: number) => `item-${index}`} // this is required when you are using FlatList
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
        customRefreshView={(status: number) => {
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
        ref={(ref: { refresh: () => void }) => (this.ulv = ref)}
      />
    )
  }
}

export default ListView