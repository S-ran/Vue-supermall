import {request} from './request'

export function getCategory() {// 1.请求总分类数据
    return request({
      url: '/category'
    })
  }
  
  export function getSubcategory(maitKey) {//请求子页面分类数据
    return request({
      url: '/subcategory',
      params: {
        maitKey
      }
    })
  }
  
  export function getCategoryDetail(miniWallkey, type) {//请求子页面分类详情数据
    return request({
      url: '/subcategorydetail',
      params: {
        miniWallkey,
        type
      }
    })
  }